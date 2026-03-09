package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.dto.OrderRequest;
import com.ranveer.sweetshop.model.Order;
import com.ranveer.sweetshop.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /* =========================
       Place Order
       Accessible by USER & ADMIN
    ========================= */

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PostMapping
    public ResponseEntity<Order> placeOrder(
            Authentication authentication,
            @Valid @RequestBody OrderRequest request) {

        String username = authentication.getName();

        Order order = orderService.placeOrder(username, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    /* =========================
       Get Orders of Logged-in User
    ========================= */

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {

        String username = authentication.getName();

        List<Order> orders = orderService.getUserOrders(username);

        return ResponseEntity.ok(orders);
    }

    /* =========================
       Admin: View All Orders
    ========================= */

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<List<Order>> getAllOrders() {

        List<Order> orders = orderService.getAllOrders();

        return ResponseEntity.ok(orders);
    }

    /* =========================
       Admin: Update Order Status
    ========================= */

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String status = body.get("status");

        Order order = orderService.updateStatus(id, status);

        return ResponseEntity.ok(order);
    }

    /* =========================
       Generate Invoice
    ========================= */

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{id}/invoice")
    public ResponseEntity<Map<String, Object>> getInvoice(
            Authentication authentication,
            @PathVariable Long id) {

        String username = authentication.getName();

        Map<String, Object> invoice =
                orderService.getInvoice(username, id);

        return ResponseEntity.ok(invoice);
    }
}