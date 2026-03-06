package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.dto.OrderRequest;
import com.ranveer.sweetshop.model.Order;
import com.ranveer.sweetshop.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // ✅ Place Order
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<Order> placeOrder(Authentication authentication,
                                            @RequestBody OrderRequest request) {

        String username = authentication.getName();

        Order order = orderService.placeOrder(username, request);

        return ResponseEntity.ok(order);
    }

    // ✅ User Order History
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {

        List<Order> orders = orderService.getUserOrders(authentication.getName());

        return ResponseEntity.ok(orders);
    }

    // ✅ Admin View All Orders
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<List<Order>> getAllOrders() {

        List<Order> orders = orderService.getAllOrders();

        return ResponseEntity.ok(orders);
    }

    // ✅ Invoice API
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{id}/invoice")
    public ResponseEntity<Map<String, Object>> getInvoice(@PathVariable Long id) {

        Map<String, Object> invoice = orderService.getInvoice(id);

        return ResponseEntity.ok(invoice);
    }
}