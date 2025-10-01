package com.example.tenantmanagement.service;

import com.example.tenantmanagement.domain.Property;
import com.example.tenantmanagement.domain.Tenant;
import com.example.tenantmanagement.repository.PropertyRepository;
import com.example.tenantmanagement.repository.TenantRepository;
import com.example.tenantmanagement.web.dto.TenantDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TenantService {
    private final TenantRepository repo;
    private final PropertyRepository propertyRepository;

    public TenantService(TenantRepository repo, PropertyRepository propertyRepository) {
        this.repo = repo;
        this.propertyRepository = propertyRepository;
    }

    public List<TenantDto> list() {
        return repo.findAllWithProperty().stream().map(Mapping::toDto).collect(Collectors.toList());
    }

    public TenantDto create(TenantDto dto) {
        Tenant e = new Tenant();
        apply(dto, e);
        return Mapping.toDto(repo.save(e));
    }

    public TenantDto get(Long id) {
        return Mapping.toDto(repo.findByIdWithProperty(id));
    }

    public TenantDto update(Long id, TenantDto dto) {
        Tenant e = repo.findById(id).orElseThrow();
        apply(dto, e);
        return Mapping.toDto(repo.save(e));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    private void apply(TenantDto dto, Tenant e) {
        if (dto.name != null) e.setName(dto.name);
        if (dto.propertyId != null) {
            Property p = propertyRepository.findById(dto.propertyId).orElseThrow();
            e.setProperty(p);
        }
        e.setPassport(dto.passport);
        e.setPassportValidity(dto.passportValidity);
        e.setAadharNo(dto.aadharNo);
        e.setEmploymentDetails(dto.employmentDetails);
        e.setPermanentAddress(dto.permanentAddress);
        e.setContactNo(dto.contactNo);
        e.setEmergencyContactNo(dto.emergencyContactNo);
        if (dto.rent != null) e.setRent(dto.rent);
        if (dto.security != null) e.setSecurity(dto.security);
        e.setMoveInDate(dto.moveInDate);
        e.setContractStartDate(dto.contractStartDate);
        e.setContractExpiryDate(dto.contractExpiryDate);
    }
}


