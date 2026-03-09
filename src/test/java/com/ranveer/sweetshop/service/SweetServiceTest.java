package com.ranveer.sweetshop.service;

import com.ranveer.sweetshop.exception.InsufficientStockException;
import com.ranveer.sweetshop.model.Sweet;
import com.ranveer.sweetshop.repository.SweetRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false) // disable security filters
@ActiveProfiles("test")                   // use test profile
@Transactional
class SweetServiceTest {

    @Autowired
    private SweetService sweetService;

    @Autowired
    private SweetRepository sweetRepository;

    @BeforeEach
    void setUp() {
        sweetRepository.deleteAll();
    }

    /* =========================
       Add Sweet Test
    ========================= */

    @Test
    void shouldAddNewSweet() {

        Sweet sweet = Sweet.builder()
                .name("Ladoo")
                .category("Indian")
                .price(20.0)
                .quantity(50)
                .build();

        Sweet saved = sweetService.addSweet(sweet);

        assertNotNull(saved.getId());
        assertEquals("Ladoo", saved.getName());
    }

    /* =========================
       Get All Sweets Test
    ========================= */

    @Test
    void shouldReturnAllSweets() {

        sweetService.addSweet(
                Sweet.builder().name("Barfi").category("Indian").price(25).quantity(20).build()
        );

        sweetService.addSweet(
                Sweet.builder().name("Cake").category("Bakery").price(40).quantity(15).build()
        );

        Pageable pageable = PageRequest.of(0, 10);

        Page<Sweet> sweets = sweetService.getAllSweets(pageable);

        assertEquals(2, sweets.getTotalElements());
    }

    /* =========================
       Purchase Sweet Test
    ========================= */

    @Test
    void shouldDecreaseQuantityWhenPurchased() {

        Sweet sweet = sweetService.addSweet(
                Sweet.builder().name("Ladoo").category("Indian").price(20).quantity(10).build()
        );

        Sweet updated = sweetService.purchaseSweet(sweet.getId(), 3);

        assertEquals(7, updated.getQuantity());
    }

    /* =========================
       Insufficient Stock Test
    ========================= */

    @Test
    void shouldThrowExceptionIfInsufficientStock() {

        Sweet sweet = sweetService.addSweet(
                Sweet.builder().name("Barfi").category("Indian").price(25).quantity(5).build()
        );

        assertThrows(
                InsufficientStockException.class,
                () -> sweetService.purchaseSweet(sweet.getId(), 10)
        );
    }

    /* =========================
       Restock Test
    ========================= */

    @Test
    void shouldIncreaseQuantityWhenRestocked() {

        Sweet sweet = sweetService.addSweet(
                Sweet.builder().name("Kaju Katli").category("Premium").price(50).quantity(5).build()
        );

        Sweet updated = sweetService.restockSweet(sweet.getId(), 10);

        assertEquals(15, updated.getQuantity());
    }

    /* =========================
       Negative Restock Test
    ========================= */

    @Test
    void shouldThrowExceptionIfRestockQuantityIsNegative() {

        Sweet sweet = sweetService.addSweet(
                Sweet.builder().name("Milk Cake").category("Indian").price(30).quantity(10).build()
        );

        assertThrows(
                IllegalArgumentException.class,
                () -> sweetService.restockSweet(sweet.getId(), -5)
        );
    }

    /* =========================
       Search Test
    ========================= */

    @Test
    void shouldSearchSweetsByNameCategoryAndPriceRange() {

        sweetService.addSweet(
                Sweet.builder().name("Chocolate Cake").category("Bakery").price(100).quantity(10).build()
        );

        sweetService.addSweet(
                Sweet.builder().name("Vanilla Cake").category("Bakery").price(80).quantity(5).build()
        );

        sweetService.addSweet(
                Sweet.builder().name("Ladoo").category("Indian").price(20).quantity(50).build()
        );

        var result = sweetService.searchSweets("Cake", "Bakery", 50.0, 120.0);

        assertEquals(2, result.size());
    }
}