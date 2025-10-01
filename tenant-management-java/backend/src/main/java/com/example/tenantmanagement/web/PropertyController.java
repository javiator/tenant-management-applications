package com.example.tenantmanagement.web;

import com.example.tenantmanagement.service.PropertyService;
import com.example.tenantmanagement.web.dto.PropertyDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    private final PropertyService service;
    public PropertyController(PropertyService service) { this.service = service; }

    @GetMapping
    public List<PropertyDto> list() { return service.list(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PropertyDto create(@Valid @RequestBody PropertyDto dto) { return service.create(dto); }

    @GetMapping("/{id}")
    public PropertyDto get(@PathVariable Long id) { return service.get(id); }

    @PutMapping("/{id}")
    public PropertyDto update(@PathVariable Long id, @RequestBody PropertyDto dto) { return service.update(id, dto); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}


