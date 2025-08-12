# Tenant Transactions Summary Endpoint
@api.route('/tenants/<int:tenant_id>/transactions', methods=['GET'])
def get_tenant_transactions(tenant_id):
    """Fetch all transactions for a specific tenant and calculate the total balance."""
    try:
        tenant_obj = TenantService.get_tenant_by_id(tenant_id)
        transactions = Transaction.query.filter_by(tenant_id=tenant_id).order_by(Transaction.transaction_date.desc()).all()
        transactions_list = [tx.to_dict() for tx in transactions]
        # Calculate the total balance for the tenant
        total_balance = 0.0
        for tx in transactions:
            if tx.type == 'payment_received':
                total_balance += tx.amount
            else:
                total_balance -= tx.amount
        return jsonify({
            'transactions': transactions_list,
            'total': total_balance
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 404
from flask import Blueprint, request, jsonify, send_file
from datetime import datetime, date
from .models import db, Tenant, Property, Transaction
from .services import (
    DatabaseService, ReportService, 
    TenantService, PropertyService, TransactionService
)

# Create API blueprint
api = Blueprint('api', __name__, url_prefix='/api')

# Tenant routes
@api.route('/tenants', methods=['GET'])
def get_tenants():
    """Get all tenants with optional pagination."""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        tenants = Tenant.query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'tenants': [tenant.to_dict() for tenant in tenants.items],
            'total': tenants.total,
            'pages': tenants.pages,
            'current_page': tenants.page,
            'has_next': tenants.has_next,
            'has_prev': tenants.has_prev
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/tenants/<int:tenant_id>', methods=['GET'])
def get_tenant(tenant_id):
    """Get a specific tenant by ID."""
    try:
        tenant = TenantService.get_tenant_by_id(tenant_id)
        return jsonify(tenant.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@api.route('/tenants', methods=['POST'])
def create_tenant():
    """Create a new tenant."""
    try:
        data = request.get_json()
        
        # Convert date strings to date objects
        date_fields = ['passport_validity', 'move_in_date', 'contract_start_date', 'contract_expiry_date']
        for field in date_fields:
            if field in data and data[field]:
                data[field] = datetime.strptime(data[field], '%Y-%m-%d').date()
        
        tenant = TenantService.create_tenant(data)
        return jsonify(tenant.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/tenants/<int:tenant_id>', methods=['PUT'])
def update_tenant(tenant_id):
    """Update an existing tenant."""
    try:
        data = request.get_json()
        
        # Convert date strings to date objects
        date_fields = ['passport_validity', 'move_in_date', 'contract_start_date', 'contract_expiry_date']
        for field in date_fields:
            if field in data and data[field]:
                data[field] = datetime.strptime(data[field], '%Y-%m-%d').date()
        
        tenant = TenantService.update_tenant(tenant_id, data)
        return jsonify(tenant.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/tenants/<int:tenant_id>', methods=['DELETE'])
def delete_tenant(tenant_id):
    """Delete a tenant."""
    try:
        TenantService.delete_tenant(tenant_id)
        return jsonify({'message': 'Tenant deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Property routes
@api.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties."""
    try:
        properties = PropertyService.get_all_properties()
        return jsonify([property.to_dict() for property in properties])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get a specific property by ID."""
    try:
        property_obj = PropertyService.get_property_by_id(property_id)
        return jsonify(property_obj.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@api.route('/properties', methods=['POST'])
def create_property():
    """Create a new property."""
    try:
        data = request.get_json()
        property_obj = PropertyService.create_property(data)
        return jsonify(property_obj.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/properties/<int:property_id>', methods=['PUT'])
def update_property(property_id):
    """Update an existing property."""
    try:
        data = request.get_json()
        property_obj = PropertyService.update_property(property_id, data)
        return jsonify(property_obj.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/properties/<int:property_id>', methods=['DELETE'])
def delete_property(property_id):
    """Delete a property."""
    try:
        PropertyService.delete_property(property_id)
        return jsonify({'message': 'Property deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/properties/<int:property_id>/transactions', methods=['GET'])
def get_property_transactions(property_id):
    """Fetch all transactions for a specific property and calculate the total balance."""
    try:
        property_obj = PropertyService.get_property_by_id(property_id)
        transactions = Transaction.query.filter_by(property_id=property_id).order_by(Transaction.transaction_date.desc()).all()
        transactions_list = [tx.to_dict() for tx in transactions]
        # Calculate the total balance for the property
        total_balance = 0.0
        for tx in transactions:
            if tx.type == 'payment_received':
                total_balance += tx.amount
            else:
                total_balance -= tx.amount
        return jsonify({
            'transactions': transactions_list,
            'total': total_balance
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# Transaction routes
@api.route('/transactions', methods=['GET'])
def get_transactions():
    """Get all transactions."""
    try:
        transactions = TransactionService.get_all_transactions()
        return jsonify([transaction.to_dict() for transaction in transactions])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/transactions/<int:transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    """Get a specific transaction by ID."""
    try:
        transaction = TransactionService.get_transaction_by_id(transaction_id)
        return jsonify(transaction.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@api.route('/transactions', methods=['POST'])
def create_transaction():
    """Create a new transaction."""
    try:
        data = request.get_json()
        
        # Convert date string to date object
        if 'transaction_date' in data and data['transaction_date']:
            data['transaction_date'] = datetime.strptime(data['transaction_date'], '%Y-%m-%d').date()
        
        transaction = TransactionService.create_transaction(data)
        return jsonify(transaction.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    """Update an existing transaction."""
    try:
        data = request.get_json()
        
        # Convert date string to date object
        if 'transaction_date' in data and data['transaction_date']:
            data['transaction_date'] = datetime.strptime(data['transaction_date'], '%Y-%m-%d').date()
        
        transaction = TransactionService.update_transaction(transaction_id, data)
        return jsonify(transaction.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    """Delete a transaction."""
    try:
        TransactionService.delete_transaction(transaction_id)
        return jsonify({'message': 'Transaction deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Report routes
@api.route('/reports/tenants_csv')
def report_tenants_csv():
    """Generate and download a CSV report of all tenants."""
    try:
        tenants = TenantService.get_all_tenants()
        headers = [
            'ID', 'Name', 'Property Address', 'Passport', 'Passport Validity', 'Aadhar No',
            'Employment Details', 'Permanent Address', 'Contact No', 'Emergency Contact No',
            'Rent', 'Security', 'Move In Date', 'Contract Start Date', 'Contract Expiry Date', 'Created Date'
        ]
        data = [
            [
                t.id, t.name, t.property.address if t.property else 'N/A', t.passport, t.passport_validity,
                t.aadhar_no, t.employment_details, t.permanent_address, t.contact_no, t.emergency_contact_no,
                t.rent, t.security, t.move_in_date, t.contract_start_date, t.contract_expiry_date, t.created_date
            ] for t in tenants
        ]
        report_file = ReportService.generate_csv_report(data, headers)
        return send_file(
            report_file,
            mimetype='text/csv',
            as_attachment=True,
            download_name='tenants_report.csv'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/reports/properties_csv')
def report_properties_csv():
    """Generate and download a CSV report of all properties."""
    try:
        properties = PropertyService.get_all_properties()
        headers = ['ID', 'Address', 'Rent', 'Maintenance', 'Created Date']
        data = [
            [p.id, p.address, p.rent, p.maintenance, p.created_date] for p in properties
        ]
        report_file = ReportService.generate_csv_report(data, headers)
        return send_file(
            report_file,
            mimetype='text/csv',
            as_attachment=True,
            download_name='properties_report.csv'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/reports/transactions_csv')
def report_transactions_csv():
    """Generate and download a CSV report of all transactions."""
    try:
        transactions = TransactionService.get_all_transactions()
        headers = [
            'ID', 'Property Address', 'Tenant Name', 'Type', 'For Month', 'Amount', 'Transaction Date', 'Comments'
        ]
        data = [
            [
                t.id, t.property.address if t.property else 'N/A',
                t.tenant.name if t.tenant else 'N/A',
                t.type, t.for_month, t.amount, t.transaction_date, t.comments
            ] for t in transactions
        ]
        report_file = ReportService.generate_csv_report(data, headers)
        return send_file(
            report_file,
            mimetype='text/csv',
            as_attachment=True,
            download_name='transactions_report.csv'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Backup route
@api.route('/backup')
def backup_database():
    """Create a backup of the database."""
    try:
        backup_file_path, backup_filename = DatabaseService.backup_database()
        return send_file(
            backup_file_path,
            as_attachment=True,
            download_name=backup_filename,
            mimetype='application/octet-stream'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500
