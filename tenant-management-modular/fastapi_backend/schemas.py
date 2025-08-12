from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel

class PropertyBase(BaseModel):
    address: str
    rent: float = 0.0
    maintenance: float = 0.0

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    address: Optional[str] = None
    rent: Optional[float] = None
    maintenance: Optional[float] = None

class PropertyOut(PropertyBase):
    id: int
    created_date: Optional[datetime] = None

    class Config:
        from_attributes = True

class TenantBase(BaseModel):
    name: str
    property_id: Optional[int] = None
    passport: Optional[str] = None
    passport_validity: Optional[date] = None
    aadhar_no: Optional[str] = None
    employment_details: Optional[str] = None
    permanent_address: Optional[str] = None
    contact_no: Optional[str] = None
    emergency_contact_no: Optional[str] = None
    rent: float = 0.0
    security: float = 0.0
    move_in_date: Optional[date] = None
    contract_start_date: Optional[date] = None
    contract_expiry_date: Optional[date] = None

class TenantCreate(TenantBase):
    pass

class TenantUpdate(BaseModel):
    name: Optional[str] = None
    property_id: Optional[int] = None
    passport: Optional[str] = None
    passport_validity: Optional[date] = None
    aadhar_no: Optional[str] = None
    employment_details: Optional[str] = None
    permanent_address: Optional[str] = None
    contact_no: Optional[str] = None
    emergency_contact_no: Optional[str] = None
    rent: Optional[float] = None
    security: Optional[float] = None
    move_in_date: Optional[date] = None
    contract_start_date: Optional[date] = None
    contract_expiry_date: Optional[date] = None

class TenantOut(TenantBase):
    id: int
    created_date: Optional[datetime] = None

    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    property_id: int
    tenant_id: Optional[int] = None
    type: str
    for_month: Optional[str] = None
    amount: float
    transaction_date: date
    comments: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    property_id: Optional[int] = None
    tenant_id: Optional[int] = None
    type: Optional[str] = None
    for_month: Optional[str] = None
    amount: Optional[float] = None
    transaction_date: Optional[date] = None
    comments: Optional[str] = None

class TransactionOut(TransactionBase):
    id: int

    class Config:
        from_attributes = True
