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

    public CartItem addToCart(String username, Long sweetId, int quantity) {

        Sweet sweet = sweetRepository.findById(sweetId)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        CartItem item = CartItem.builder()
                .username(username)
                .sweetId(sweet.getId())
                .sweetName(sweet.getName())
                .quantity(quantity)
                .price(sweet.getPrice() * quantity)
                .build();

        return cartRepository.save(item);
    }

    public List<CartItem> getCart(String username) {
        return cartRepository.findByUsername(username);
    }

    public void removeItem(Long id) {
        cartRepository.deleteById(id);
    }

    public void clearCart(String username) {
        cartRepository.deleteByUsername(username);
    }
}