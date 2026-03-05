package com.ranveer.sweetshop.service;

import com.ranveer.sweetshop.exception.InsufficientStockException;
import com.ranveer.sweetshop.model.Sweet;
import com.ranveer.sweetshop.repository.SweetRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class SweetServiceTest {

    @Autowired
    private SweetService sweetService;

    @Autowired
    private SweetRepository sweetRepository;

    @BeforeEach
    void cleanDatabase() {
        sweetRepository.deleteAll();
    }

    @Test
    void shouldAddNewSweet() {

        Sweet sweet = new Sweet(null, "Ladoo", "Indian", 20.0, 50);

        Sweet saved = sweetService.addSweet(sweet);

        assertNotNull(saved.getId());
        assertEquals("Ladoo", saved.getName());
    }

    @Test
    void shouldReturnAllSweets() {

        sweetService.addSweet(new Sweet(null, "Barfi", "Indian", 25.0, 20));
        sweetService.addSweet(new Sweet(null, "Cake", "Bakery", 40.0, 15));

        Pageable pageable = PageRequest.of(0, 10);

        Page<Sweet> sweets = sweetService.getAllSweets(pageable);

        assertEquals(2, sweets.getTotalElements());
    }

    @Test
    void shouldDecreaseQuantityWhenPurchased() {

        Sweet sweet = sweetService.addSweet(
                new Sweet(null, "Ladoo", "Indian", 20.0, 10)
        );

        Sweet updated = sweetService.purchaseSweet(sweet.getId(), 3);

        assertEquals(7, updated.getQuantity());
    }

    @Test
    void shouldThrowExceptionIfInsufficientStock() {

        Sweet sweet = sweetService.addSweet(
                new Sweet(null, "Barfi", "Indian", 25.0, 5)
        );

        assertThrows(InsufficientStockException.class, () -> {
            sweetService.purchaseSweet(sweet.getId(), 10);
        });
    }

    @Test
    void shouldIncreaseQuantityWhenRestocked() {

        Sweet sweet = sweetService.addSweet(
                new Sweet(null, "Kaju Katli", "Premium", 50.0, 5)
        );

        Sweet updated = sweetService.restockSweet(sweet.getId(), 10);

        assertEquals(15, updated.getQuantity());
    }

    @Test
    void shouldThrowExceptionIfRestockQuantityIsNegative() {

        Sweet sweet = sweetService.addSweet(
                new Sweet(null, "Milk Cake", "Indian", 30.0, 10)
        );

        assertThrows(IllegalArgumentException.class, () -> {
            sweetService.restockSweet(sweet.getId(), -5);
        });
    }

    @Test
    void shouldSearchSweetsByNameCategoryAndPriceRange() {

        sweetService.addSweet(new Sweet(null, "Chocolate Cake", "Bakery", 100.0, 10));
        sweetService.addSweet(new Sweet(null, "Vanilla Cake", "Bakery", 80.0, 5));
        sweetService.addSweet(new Sweet(null, "Ladoo", "Indian", 20.0, 50));

        var result = sweetService.searchSweets("Cake", "Bakery", 50.0, 120.0);

        assertEquals(2, result.size());
    }
}