package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.dto.OrderRequest;
import com.ranveer.sweetshop.model.Order;
import com.ranveer.sweetshop.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Place Order
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public Order placeOrder(Authentication authentication,
                            @RequestBody OrderRequest request) {

        String username = authentication.getName();

        return orderService.placeOrder(username, request);
    }

    // User Orders
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public List<Order> getMyOrders(Authentication authentication) {

        return orderService.getUserOrders(authentication.getName());
    }

    // Admin View All Orders
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }
}