package com.example.tenantmanagement.web;

import com.example.tenantmanagement.service.TransactionService;
import com.example.tenantmanagement.web.dto.TransactionDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService service;
    public TransactionController(TransactionService service) { this.service = service; }

    @GetMapping
    public List<TransactionDto> list() { return service.list(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionDto create(@Valid @RequestBody TransactionDto dto) { return service.create(dto); }

    @GetMapping("/{id}")
    public TransactionDto get(@PathVariable Long id) { return service.get(id); }

    @PutMapping("/{id}")
    public TransactionDto update(@PathVariable Long id, @RequestBody TransactionDto dto) { return service.update(id, dto); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}


