package com.example.tenantmanagement.web.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class TransactionDto {
    public Long id;
    @NotNull
    public Long propertyId;
    public String propertyAddress;
    public Long tenantId;
    public String tenantName;
    @NotNull
    public String type;
    public String forMonth;
    @NotNull
    public Double amount;
    @NotNull
    public LocalDate transactionDate;
    public String comments;
}


