package com.example.tenantmanagement.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class TenantDto {
    public Long id;
    @NotBlank
    public String name;
    @NotNull
    public Long propertyId;
    public String propertyAddress;
    public String passport;
    public LocalDate passportValidity;
    public String aadharNo;
    public String employmentDetails;
    public String permanentAddress;
    public String contactNo;
    public String emergencyContactNo;
    public Double rent;
    public Double security;
    public LocalDate moveInDate;
    public LocalDate contractStartDate;
    public LocalDate contractExpiryDate;
}


