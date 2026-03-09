package com.ranveer.sweetshop.service;

import com.ranveer.sweetshop.model.CartItem;
import com.ranveer.sweetshop.model.Sweet;
import com.ranveer.sweetshop.repository.CartRepository;
import com.ranveer.sweetshop.repository.SweetRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final SweetRepository sweetRepository;

    /* =========================
       Add Item to Cart
    ========================= */

    public CartItem addToCart(String username, Long sweetId, int quantity) {

        Sweet sweet = sweetRepository.findById(sweetId)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        CartItem item = CartItem.builder()
                .username(username)
                .sweetId(sweet.getId())
                .sweetName(sweet.getName())
                .quantity(quantity)
                .price(sweet.getPrice() * quantity)
                .build();

        return cartRepository.save(item);
    }

    /* =========================
       Get User Cart
    ========================= */

    public List<CartItem> getCart(String username) {
        return cartRepository.findByUsername(username);
    }

    /* =========================
       Remove Cart Item
    ========================= */

    public void removeItem(String username, Long id) {

        CartItem item = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!item.getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized action");
        }

        cartRepository.delete(item);
    }

    /* =========================
       Clear Entire Cart
    ========================= */

    public void clearCart(String username) {
        cartRepository.deleteByUsername(username);
    }
}