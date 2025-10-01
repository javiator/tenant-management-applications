CREATE TABLE property (
    id BIGSERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    rent DOUBLE PRECISION NOT NULL DEFAULT 0,
    maintenance DOUBLE PRECISION NOT NULL DEFAULT 0,
    created_date TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(50),
    last_updated TIMESTAMP WITH TIME ZONE,
    last_updated_by VARCHAR(50)
);

CREATE TABLE tenant (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    property_id BIGINT REFERENCES property(id),
    passport VARCHAR(100),
    passport_validity DATE,
    aadhar_no VARCHAR(100),
    employment_details VARCHAR(255),
    permanent_address VARCHAR(255),
    contact_no VARCHAR(20),
    emergency_contact_no VARCHAR(20),
    rent DOUBLE PRECISION DEFAULT 0,
    security DOUBLE PRECISION DEFAULT 0,
    move_in_date DATE,
    contract_start_date DATE,
    contract_expiry_date DATE,
    created_date TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(50),
    last_updated TIMESTAMP WITH TIME ZONE,
    last_updated_by VARCHAR(50)
);

CREATE TABLE transaction (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL REFERENCES property(id),
    tenant_id BIGINT REFERENCES tenant(id),
    type VARCHAR(50) NOT NULL,
    for_month VARCHAR(20),
    amount DOUBLE PRECISION NOT NULL,
    transaction_date DATE NOT NULL,
    comments VARCHAR(255),
    created_date TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(50),
    last_updated TIMESTAMP WITH TIME ZONE,
    last_updated_by VARCHAR(50)
);


