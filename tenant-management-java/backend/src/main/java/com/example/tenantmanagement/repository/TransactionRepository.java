package com.example.tenantmanagement.repository;

import com.example.tenantmanagement.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    @Query("SELECT t FROM Transaction t LEFT JOIN FETCH t.tenant LEFT JOIN FETCH t.property WHERE t.tenant.id = :tenantId")
    List<Transaction> findByTenantId(@Param("tenantId") Long tenantId);
    
    @Query("SELECT t FROM Transaction t LEFT JOIN FETCH t.tenant LEFT JOIN FETCH t.property WHERE t.property.id = :propertyId")
    List<Transaction> findByPropertyId(@Param("propertyId") Long propertyId);
}


