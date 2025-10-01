package com.example.tenantmanagement.repository;

import com.example.tenantmanagement.domain.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}


