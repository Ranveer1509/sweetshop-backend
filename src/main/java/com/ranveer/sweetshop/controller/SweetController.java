package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.model.Sweet;
import com.ranveer.sweetshop.service.SweetService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import org.springdoc.core.annotations.ParameterObject;

@RestController
@RequestMapping("/api/sweets")
@RequiredArgsConstructor
public class SweetController {

    private final SweetService sweetService;

    // 🔹 View all sweets with Pagination (USER + ADMIN)
   @GetMapping
public ResponseEntity<Page<Sweet>> getAllSweets(
        @ParameterObject
        @PageableDefault(size = 5, sort = "name") Pageable pageable) {

    return ResponseEntity.ok(sweetService.getAllSweets(pageable));
}

    // 🔹 Add sweet (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Sweet> addSweet(@Valid @RequestBody Sweet sweet) {

        Sweet savedSweet = sweetService.addSweet(sweet);

        return ResponseEntity.status(201).body(savedSweet);
    }

    // 🔹 Update sweet (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Sweet> updateSweet(
            @PathVariable Long id,
            @Valid @RequestBody Sweet updatedSweet) {

        Sweet updated = sweetService.updateSweet(id, updatedSweet);

        return ResponseEntity.ok(updated);
    }

    // 🔹 Delete sweet (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSweet(@PathVariable Long id) {

        sweetService.deleteSweet(id);

        return ResponseEntity.noContent().build();
    }

    // 🔹 Purchase sweet (USER + ADMIN)
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(
            @PathVariable Long id,
            @RequestParam
            @Min(value = 1, message = "Quantity must be at least 1")
            int quantity) {

        Sweet updatedSweet = sweetService.purchaseSweet(id, quantity);

        return ResponseEntity.ok(updatedSweet);
    }

    // 🔹 Restock sweet (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/restock")
    public ResponseEntity<Sweet> restockSweet(
            @PathVariable Long id,
            @RequestParam
            @Min(value = 1, message = "Quantity must be at least 1")
            int quantity) {

        Sweet updatedSweet = sweetService.restockSweet(id, quantity);

        return ResponseEntity.ok(updatedSweet);
    }

    // 🔹 Search sweets (USER + ADMIN)
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> searchSweets(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String category,
            @RequestParam(defaultValue = "0") double minPrice,
            @RequestParam(defaultValue = "999999") double maxPrice) {

        List<Sweet> sweets = sweetService.searchSweets(name, category, minPrice, maxPrice);

        return ResponseEntity.ok(sweets);
    }
}