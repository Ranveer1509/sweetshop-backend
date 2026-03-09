package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.model.CartItem;
import com.ranveer.sweetshop.service.CartService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class CartController {

    private final CartService cartService;

    /* =========================
       Add Item to Cart
    ========================= */

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(
            Authentication auth,
            @RequestParam Long sweetId,
            @RequestParam int quantity) {

        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        CartItem item = cartService.addToCart(auth.getName(), sweetId, quantity);

        return ResponseEntity.ok(item);
    }

    /* =========================
       Get Cart
    ========================= */

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(Authentication auth) {

        List<CartItem> cart = cartService.getCart(auth.getName());

        return ResponseEntity.ok(cart);
    }

    /* =========================
       Remove Cart Item
    ========================= */

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeItem(
            Authentication auth,
            @PathVariable Long id) {

        cartService.removeItem(auth.getName(), id);

        return ResponseEntity.ok().build();
    }
}