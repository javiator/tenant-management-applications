package com.example.tenantmanagement.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "property")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false)
    private Double rent = 0.0;

    @Column(nullable = false)
    private Double maintenance = 0.0;

    @Column(name = "created_date")
    private OffsetDateTime createdDate;

    @Column(name = "created_by", length = 50)
    private String createdBy = "system";

    @Column(name = "last_updated")
    private OffsetDateTime lastUpdated;

    @Column(name = "last_updated_by", length = 50)
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
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Double getRent() { return rent; }
    public void setRent(Double rent) { this.rent = rent; }
    public Double getMaintenance() { return maintenance; }
    public void setMaintenance(Double maintenance) { this.maintenance = maintenance; }
    public OffsetDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(OffsetDateTime createdDate) { this.createdDate = createdDate; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    public OffsetDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(OffsetDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
    public String getLastUpdatedBy() { return lastUpdatedBy; }
    public void setLastUpdatedBy(String lastUpdatedBy) { this.lastUpdatedBy = lastUpdatedBy; }
}


