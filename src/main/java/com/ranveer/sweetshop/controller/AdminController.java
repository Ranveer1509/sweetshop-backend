package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.dto.AdminStatsResponse;
import com.ranveer.sweetshop.model.Sweet;
import com.ranveer.sweetshop.service.AdminService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    // Admin dashboard stats
    @GetMapping("/stats")
    public AdminStatsResponse getStats() {
        return adminService.getStats();
    }

    // Low stock sweets
    @GetMapping("/low-stock")
    public List<Sweet> getLowStock() {
        return adminService.getLowStock();
    }
}