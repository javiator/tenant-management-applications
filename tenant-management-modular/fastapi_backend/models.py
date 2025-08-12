from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class BaseMixin:
    created_date = Column(DateTime, server_default=func.now())
    created_by = Column(String(50), default="system")
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())
    last_updated_by = Column(String(50), default="system")

class Property(Base, BaseMixin):
    __tablename__ = "property"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255), nullable=False)
    rent = Column(Float, default=0.0)
    maintenance = Column(Float, default=0.0)

    tenants = relationship("Tenant", back_populates="property")
    transactions = relationship("Transaction", back_populates="property")

class Tenant(Base, BaseMixin):
    __tablename__ = "tenant"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    property_id = Column(Integer, ForeignKey("property.id"), nullable=True)
    passport = Column(String(100))
    passport_validity = Column(Date)
    aadhar_no = Column(String(100))
    employment_details = Column(String(255))
    permanent_address = Column(String(255))
    contact_no = Column(String(20))
    emergency_contact_no = Column(String(20))
    rent = Column(Float, default=0.0)
    security = Column(Float, default=0.0)
    move_in_date = Column(Date)
    contract_start_date = Column(Date)
    contract_expiry_date = Column(Date)

    property = relationship("Property", back_populates="tenants")
    transactions = relationship("Transaction", back_populates="tenant")

class Transaction(Base, BaseMixin):
    __tablename__ = "transaction"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("property.id"), nullable=False)
    tenant_id = Column(Integer, ForeignKey("tenant.id"))
    type = Column(String(50), nullable=False)
    for_month = Column(String(20))
    amount = Column(Float, nullable=False)
    transaction_date = Column(Date, nullable=False)
    comments = Column(String(255))

    property = relationship("Property", back_populates="transactions")
    tenant = relationship("Tenant", back_populates="transactions")
