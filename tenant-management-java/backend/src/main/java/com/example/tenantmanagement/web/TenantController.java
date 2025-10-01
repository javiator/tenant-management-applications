package com.example.tenantmanagement.web;

import com.example.tenantmanagement.service.TenantService;
import com.example.tenantmanagement.web.dto.TenantDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {
    private final TenantService service;
    public TenantController(TenantService service) { this.service = service; }

    @GetMapping
    public List<TenantDto> list() { return service.list(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TenantDto create(@Valid @RequestBody TenantDto dto) { return service.create(dto); }

    @GetMapping("/{id}")
    public TenantDto get(@PathVariable Long id) { return service.get(id); }

    @PutMapping("/{id}")
    public TenantDto update(@PathVariable Long id, @RequestBody TenantDto dto) { return service.update(id, dto); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}


