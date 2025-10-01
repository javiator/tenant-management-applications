from datetime import datetime, date
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Base(db.Model):
    """Base model with common fields."""
    __abstract__ = True
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String(50), default="system")
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_updated_by = db.Column(db.String(50), default="system")

class Tenant(Base):
    """Tenant model for property management."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=True)
    passport = db.Column(db.String(100))
    passport_validity = db.Column(db.Date)
    aadhar_no = db.Column(db.String(100))
    employment_details = db.Column(db.String(255))
    permanent_address = db.Column(db.String(255))
    contact_no = db.Column(db.String(20))
    emergency_contact_no = db.Column(db.String(20))
    rent = db.Column(db.Float, default=0.0)
    security = db.Column(db.Float, default=0.0)
    move_in_date = db.Column(db.Date)
    contract_start_date = db.Column(db.Date)
    contract_expiry_date = db.Column(db.Date)

    # Relationship to Property model
    property = db.relationship('Property', backref='tenants')

    def to_dict(self):
        """Convert model instance to dictionary for JSON serialization."""
        return {
            'id': self.id,
            'name': self.name,
            'property_id': self.property_id,
            'property_address': self.property.address if self.property else 'N/A',
            'passport': self.passport,
            'passport_validity': self.passport_validity.isoformat() if self.passport_validity else None,
            'aadhar_no': self.aadhar_no,
            'employment_details': self.employment_details,
            'permanent_address': self.permanent_address,
            'contact_no': self.contact_no,
            'emergency_contact_no': self.emergency_contact_no,
            'rent': self.rent,
            'security': self.security,
            'move_in_date': self.move_in_date.isoformat() if self.move_in_date else None,
            'contract_start_date': self.contract_start_date.isoformat() if self.contract_start_date else None,
            'contract_expiry_date': self.contract_expiry_date.isoformat() if self.contract_expiry_date else None,
            'created_date': self.created_date.isoformat(),
            'created_by': self.created_by,
            'last_updated': self.last_updated.isoformat(),
            'last_updated_by': self.last_updated_by
        }

class Property(Base):
    """Property model for property management."""
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(255), nullable=False)
    rent = db.Column(db.Float, default=0.0)
    maintenance = db.Column(db.Float, default=0.0)

    def to_dict(self):
        """Convert model instance to dictionary for JSON serialization."""
        return {
            'id': self.id,
            'address': self.address,
            'rent': self.rent,
            'maintenance': self.maintenance,
            'created_date': self.created_date.isoformat(),
            'created_by': self.created_by,
            'last_updated': self.last_updated.isoformat(),
            'last_updated_by': self.last_updated_by
        }

class Transaction(Base):
    """Transaction model for property management."""
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'))
    type = db.Column(db.String(50), nullable=False)
    for_month = db.Column(db.String(20))
    amount = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.Date, default=date.today, nullable=False)
    comments = db.Column(db.String(255))

    # Relationships to Property and Tenant models
    property = db.relationship('Property', backref='transactions')
    tenant = db.relationship('Tenant', backref='transactions')

    def to_dict(self):
        """Convert model instance to dictionary for JSON serialization."""
        return {
            'id': self.id,
            'property_id': self.property_id,
            'property_address': self.property.address if self.property else 'N/A',
            'tenant_id': self.tenant_id,
            'tenant_name': self.tenant.name if self.tenant else 'N/A',
            'type': self.type,
            'for_month': self.for_month,
            'amount': self.amount,
            'transaction_date': self.transaction_date.isoformat(),
            'comments': self.comments,
            'created_date': self.created_date.isoformat(),
            'created_by': self.created_by,
            'last_updated': self.last_updated.isoformat(),
            'last_updated_by': self.last_updated_by
        }
