from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from sqlalchemy.orm import Session
from typing import List
import csv
from io import StringIO
import os
import shutil
from datetime import datetime

from .config import settings
from .database import Base, engine, get_db
from . import models
from .schemas import (
    TenantCreate, TenantUpdate, TenantOut,
    PropertyCreate, PropertyUpdate, PropertyOut,
    TransactionCreate, TransactionUpdate, TransactionOut
)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Tenant Management API (FastAPI)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tenants
@app.get("/api/tenants", response_model=List[TenantOut])
def list_tenants(db: Session = Depends(get_db)):
    return db.query(models.Tenant).all()

@app.post("/api/tenants", response_model=TenantOut, status_code=201)
def create_tenant(payload: TenantCreate, db: Session = Depends(get_db)):
    tenant = models.Tenant(**payload.dict())
    db.add(tenant)
    db.commit()
    db.refresh(tenant)
    return tenant

@app.get("/api/tenants/{tenant_id}", response_model=TenantOut)
def get_tenant(tenant_id: int, db: Session = Depends(get_db)):
    tenant = db.query(models.Tenant).get(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return tenant

@app.put("/api/tenants/{tenant_id}", response_model=TenantOut)
def update_tenant(tenant_id: int, payload: TenantUpdate, db: Session = Depends(get_db)):
    tenant = db.query(models.Tenant).get(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(tenant, k, v)
    db.commit()
    db.refresh(tenant)
    return tenant

@app.delete("/api/tenants/{tenant_id}")
def delete_tenant(tenant_id: int, db: Session = Depends(get_db)):
    tenant = db.query(models.Tenant).get(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    db.delete(tenant)
    db.commit()
    return {"message": "Tenant deleted"}

# Properties
@app.get("/api/properties", response_model=List[PropertyOut])
def list_properties(db: Session = Depends(get_db)):
    return db.query(models.Property).all()

@app.post("/api/properties", response_model=PropertyOut, status_code=201)
def create_property(payload: PropertyCreate, db: Session = Depends(get_db)):
    prop = models.Property(**payload.dict())
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop

@app.get("/api/properties/{property_id}", response_model=PropertyOut)
def get_property(property_id: int, db: Session = Depends(get_db)):
    prop = db.query(models.Property).get(property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return prop

@app.put("/api/properties/{property_id}", response_model=PropertyOut)
def update_property(property_id: int, payload: PropertyUpdate, db: Session = Depends(get_db)):
    prop = db.query(models.Property).get(property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(prop, k, v)
    db.commit()
    db.refresh(prop)
    return prop

@app.delete("/api/properties/{property_id}")
def delete_property(property_id: int, db: Session = Depends(get_db)):
    prop = db.query(models.Property).get(property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    db.delete(prop)
    db.commit()
    return {"message": "Property deleted"}

# Transactions
@app.get("/api/transactions", response_model=List[TransactionOut])
def list_transactions(db: Session = Depends(get_db)):
    return db.query(models.Transaction).all()

@app.post("/api/transactions", response_model=TransactionOut, status_code=201)
def create_transaction(payload: TransactionCreate, db: Session = Depends(get_db)):
    txn = models.Transaction(**payload.dict())
    db.add(txn)
    db.commit()
    db.refresh(txn)
    return txn

@app.get("/api/transactions/{transaction_id}", response_model=TransactionOut)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    txn = db.query(models.Transaction).get(transaction_id)
    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return txn

@app.put("/api/transactions/{transaction_id}", response_model=TransactionOut)
def update_transaction(transaction_id: int, payload: TransactionUpdate, db: Session = Depends(get_db)):
    txn = db.query(models.Transaction).get(transaction_id)
    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(txn, k, v)
    db.commit()
    db.refresh(txn)
    return txn

@app.delete("/api/transactions/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    txn = db.query(models.Transaction).get(transaction_id)
    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(txn)
    db.commit()
    return {"message": "Transaction deleted"}

# Reports (CSV)
@app.get("/api/reports/tenants_csv")
def report_tenants_csv(db: Session = Depends(get_db)):
    tenants = db.query(models.Tenant).all()
    headers = [
        'ID','Name','Property Address','Passport','Passport Validity','Aadhar No','Employment Details','Permanent Address','Contact No','Emergency Contact No','Rent','Security','Move In Date','Contract Start Date','Contract Expiry Date','Created Date'
    ]
    rows = []
    for t in tenants:
        prop_addr = t.property.address if t.property else 'N/A'
        rows.append([
            t.id, t.name, prop_addr, t.passport, t.passport_validity, t.aadhar_no, t.employment_details,
            t.permanent_address, t.contact_no, t.emergency_contact_no, t.rent, t.security,
            t.move_in_date, t.contract_start_date, t.contract_expiry_date, t.created_date
        ])
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(headers)
    writer.writerows(rows)
    output.seek(0)
    return StreamingResponse(iter([output.getvalue()]), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=tenants_report.csv"})

@app.get("/api/reports/properties_csv")
def report_properties_csv(db: Session = Depends(get_db)):
    props = db.query(models.Property).all()
    headers = ['ID','Address','Rent','Maintenance','Created Date']
    rows = [[p.id, p.address, p.rent, p.maintenance, p.created_date] for p in props]
    output = StringIO(); writer = csv.writer(output); writer.writerow(headers); writer.writerows(rows); output.seek(0)
    return StreamingResponse(iter([output.getvalue()]), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=properties_report.csv"})

@app.get("/api/reports/transactions_csv")
def report_transactions_csv(db: Session = Depends(get_db)):
    txns = db.query(models.Transaction).all()
    headers = ['ID','Property Address','Tenant Name','Type','For Month','Amount','Transaction Date','Comments']
    rows = []
    for t in txns:
        rows.append([
            t.id, t.property.address if t.property else 'N/A', t.tenant.name if t.tenant else 'N/A',
            t.type, t.for_month, t.amount, t.transaction_date, t.comments
        ])
    output = StringIO(); writer = csv.writer(output); writer.writerow(headers); writer.writerows(rows); output.seek(0)
    return StreamingResponse(iter([output.getvalue()]), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=transactions_report.csv"})

# Backup
@app.get("/api/backup")
def backup_database():
    if not settings.sqlalchemy_url.startswith("sqlite"):
        raise HTTPException(status_code=400, detail="Backup only supported for SQLite")
    db_path = settings.resolved_sqlite_path
    if not os.path.exists(db_path):
        raise HTTPException(status_code=404, detail="Database file not found")
    os.makedirs(settings.BACKUP_STORAGE_PATH, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_filename = f"app_backup_{timestamp}.db"
    backup_path = os.path.join(settings.BACKUP_STORAGE_PATH, backup_filename)
    shutil.copy2(db_path, backup_path)
    return FileResponse(backup_path, media_type="application/octet-stream", filename=backup_filename)
