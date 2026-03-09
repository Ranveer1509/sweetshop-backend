package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.dto.AdminStatsResponse;
import com.ranveer.sweetshop.service.AdminService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // 📊 Admin dashboard statistics
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/stats")
    public AdminStatsResponse getStats() {

        return adminService.getStats();

    }

}