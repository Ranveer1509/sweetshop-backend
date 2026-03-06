package com.ranveer.sweetshop.controller;

import com.ranveer.sweetshop.model.CartItem;
import com.ranveer.sweetshop.service.CartService;

import lombok.RequiredArgsConstructor;

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

    @PostMapping("/add")
    public CartItem addToCart(Authentication auth,
                              @RequestParam Long sweetId,
                              @RequestParam int quantity) {

        return cartService.addToCart(auth.getName(), sweetId, quantity);
    }

    @GetMapping
    public List<CartItem> getCart(Authentication auth) {

        return cartService.getCart(auth.getName());
    }

    @DeleteMapping("/remove/{id}")
    public void removeItem(@PathVariable Long id) {

        cartService.removeItem(id);
    }
}