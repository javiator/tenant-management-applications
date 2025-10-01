package com.example.tenantmanagement.service;

import com.example.tenantmanagement.domain.Property;
import com.example.tenantmanagement.domain.Tenant;
import com.example.tenantmanagement.domain.Transaction;
import com.example.tenantmanagement.web.dto.PropertyDto;
import com.example.tenantmanagement.web.dto.TenantDto;
import com.example.tenantmanagement.web.dto.TransactionDto;

public class Mapping {
    public static PropertyDto toDto(Property e) {
        PropertyDto d = new PropertyDto();
        d.id = e.getId();
        d.address = e.getAddress();
        d.rent = e.getRent();
        d.maintenance = e.getMaintenance();
        return d;
    }

    public static TenantDto toDto(Tenant e) {
        TenantDto d = new TenantDto();
        d.id = e.getId();
        d.name = e.getName();
        d.propertyId = e.getProperty() != null ? e.getProperty().getId() : null;
        d.propertyAddress = e.getProperty() != null ? e.getProperty().getAddress() : null;
        d.passport = e.getPassport();
        d.passportValidity = e.getPassportValidity();
        d.aadharNo = e.getAadharNo();
        d.employmentDetails = e.getEmploymentDetails();
        d.permanentAddress = e.getPermanentAddress();
        d.contactNo = e.getContactNo();
        d.emergencyContactNo = e.getEmergencyContactNo();
        d.rent = e.getRent();
        d.security = e.getSecurity();
        d.moveInDate = e.getMoveInDate();
        d.contractStartDate = e.getContractStartDate();
        d.contractExpiryDate = e.getContractExpiryDate();
        return d;
    }

    public static TransactionDto toDto(Transaction e) {
        TransactionDto d = new TransactionDto();
        d.id = e.getId();
        d.propertyId = e.getProperty() != null ? e.getProperty().getId() : null;
        d.propertyAddress = e.getProperty() != null ? e.getProperty().getAddress() : null;
        d.tenantId = e.getTenant() != null ? e.getTenant().getId() : null;
        d.tenantName = e.getTenant() != null ? e.getTenant().getName() : null;
        d.type = e.getType();
        d.forMonth = e.getForMonth();
        d.amount = e.getAmount();
        d.transactionDate = e.getTransactionDate();
        d.comments = e.getComments();
        return d;
    }
}


