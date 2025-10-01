package com.example.tenantmanagement.repository;

import com.example.tenantmanagement.domain.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
    
    @Query("SELECT t FROM Tenant t LEFT JOIN FETCH t.property")
    List<Tenant> findAllWithProperty();
    
    @Query("SELECT t FROM Tenant t LEFT JOIN FETCH t.property WHERE t.id = :id")
    Tenant findByIdWithProperty(@Param("id") Long id);
}


