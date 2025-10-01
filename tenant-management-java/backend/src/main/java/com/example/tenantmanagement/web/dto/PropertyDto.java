package com.example.tenantmanagement.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PropertyDto {
    public Long id;
    @NotBlank
    public String address;
    @NotNull
    public Double rent;
    @NotNull
    public Double maintenance;
}


