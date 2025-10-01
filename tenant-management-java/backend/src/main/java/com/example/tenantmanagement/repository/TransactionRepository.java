package com.example.tenantmanagement.repository;

import com.example.tenantmanagement.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}


