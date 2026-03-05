package com.ranveer.sweetshop.service;

import com.ranveer.sweetshop.exception.DuplicateSweetException;
import com.ranveer.sweetshop.exception.InsufficientStockException;
import com.ranveer.sweetshop.exception.SweetNotFoundException;
import com.ranveer.sweetshop.model.Sweet;
import com.ranveer.sweetshop.repository.SweetRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class SweetService {

     private static final Logger log =
            LoggerFactory.getLogger(SweetService.class);

    private final SweetRepository sweetRepository;

    // ✅ Get All Sweets with Pagination
    public Page<Sweet> getAllSweets(Pageable pageable) {
        return sweetRepository.findAll(pageable);
    }

    // ✅ Search sweets
    public List<Sweet> searchSweets(String name,
                                    String category,
                                    double minPrice,
                                    double maxPrice) {

        return sweetRepository
                .findByNameContainingIgnoreCaseAndCategoryIgnoreCaseAndPriceBetween(
                        name == null ? "" : name,
                        category == null ? "" : category,
                        minPrice,
                        maxPrice
                );
    }

    // ✅ Add Sweet
    public Sweet addSweet(Sweet sweet) {

        log.info("Adding new sweet: {}", sweet.getName());

        if (sweetRepository.existsByNameIgnoreCase(sweet.getName())) {
            throw new DuplicateSweetException("Sweet already exists");
        }

        if (sweet.getPrice() < 0 || sweet.getQuantity() < 0) {
            throw new IllegalArgumentException("Invalid price or quantity");
        }

        return sweetRepository.save(sweet);
    }

    // ✅ Update
    public Sweet updateSweet(Long id, Sweet updatedSweet) {

        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() ->
                        new SweetNotFoundException("Sweet not found"));

        sweet.setName(updatedSweet.getName());
        sweet.setCategory(updatedSweet.getCategory());
        sweet.setPrice(updatedSweet.getPrice());
        sweet.setQuantity(updatedSweet.getQuantity());

        return sweetRepository.save(sweet);
    }

    // ✅ Delete
    public void deleteSweet(Long id) {

        if (!sweetRepository.existsById(id)) {
            throw new SweetNotFoundException("Sweet not found");
        }

        sweetRepository.deleteById(id);
    }

    // ✅ Purchase
    public Sweet purchaseSweet(Long id, int quantity) {

        log.info("Purchasing sweet ID {} with quantity {}", id, quantity);

        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() ->
                        new SweetNotFoundException("Sweet not found"));

        if (sweet.getQuantity() < quantity) {
            throw new InsufficientStockException("Insufficient stock");
        }

        sweet.setQuantity(sweet.getQuantity() - quantity);

        return sweetRepository.save(sweet);
    }

    // ✅ Restock
    public Sweet restockSweet(Long id, int quantity) {

        log.info("Restocking sweet ID {} with quantity {}", id, quantity);

        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() ->
                        new SweetNotFoundException("Sweet not found"));

        sweet.setQuantity(sweet.getQuantity() + quantity);

        return sweetRepository.save(sweet);
    }
}