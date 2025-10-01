package com.example.tenantmanagement.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "tenant")
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    private String passport;
    private LocalDate passportValidity;
    private String aadharNo;
    private String employmentDetails;
    private String permanentAddress;
    private String contactNo;
    private String emergencyContactNo;
    private Double rent = 0.0;
    private Double security = 0.0;
    private LocalDate moveInDate;
    private LocalDate contractStartDate;
    private LocalDate contractExpiryDate;

    @Column(name = "created_date")
    private OffsetDateTime createdDate;
    @Column(name = "created_by")
    private String createdBy = "system";
    @Column(name = "last_updated")
    private OffsetDateTime lastUpdated;
    @Column(name = "last_updated_by")
    private String lastUpdatedBy = "system";

    @PrePersist
    public void onCreate() {
        this.createdDate = OffsetDateTime.now();
        this.lastUpdated = this.createdDate;
    }

    @PreUpdate
    public void onUpdate() {
        this.lastUpdated = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Property getProperty() { return property; }
    public void setProperty(Property property) { this.property = property; }
    public String getPassport() { return passport; }
    public void setPassport(String passport) { this.passport = passport; }
    public LocalDate getPassportValidity() { return passportValidity; }
    public void setPassportValidity(LocalDate passportValidity) { this.passportValidity = passportValidity; }
    public String getAadharNo() { return aadharNo; }
    public void setAadharNo(String aadharNo) { this.aadharNo = aadharNo; }
    public String getEmploymentDetails() { return employmentDetails; }
    public void setEmploymentDetails(String employmentDetails) { this.employmentDetails = employmentDetails; }
    public String getPermanentAddress() { return permanentAddress; }
    public void setPermanentAddress(String permanentAddress) { this.permanentAddress = permanentAddress; }
    public String getContactNo() { return contactNo; }
    public void setContactNo(String contactNo) { this.contactNo = contactNo; }
    public String getEmergencyContactNo() { return emergencyContactNo; }
    public void setEmergencyContactNo(String emergencyContactNo) { this.emergencyContactNo = emergencyContactNo; }
    public Double getRent() { return rent; }
    public void setRent(Double rent) { this.rent = rent; }
    public Double getSecurity() { return security; }
    public void setSecurity(Double security) { this.security = security; }
    public LocalDate getMoveInDate() { return moveInDate; }
    public void setMoveInDate(LocalDate moveInDate) { this.moveInDate = moveInDate; }
    public LocalDate getContractStartDate() { return contractStartDate; }
    public void setContractStartDate(LocalDate contractStartDate) { this.contractStartDate = contractStartDate; }
    public LocalDate getContractExpiryDate() { return contractExpiryDate; }
    public void setContractExpiryDate(LocalDate contractExpiryDate) { this.contractExpiryDate = contractExpiryDate; }
    public OffsetDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(OffsetDateTime createdDate) { this.createdDate = createdDate; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    public OffsetDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(OffsetDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
    public String getLastUpdatedBy() { return lastUpdatedBy; }
    public void setLastUpdatedBy(String lastUpdatedBy) { this.lastUpdatedBy = lastUpdatedBy; }
}


