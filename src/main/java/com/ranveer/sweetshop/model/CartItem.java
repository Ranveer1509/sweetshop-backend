package com.ranveer.sweetshop.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Long sweetId;

    @Column(nullable = false)
    private String sweetName;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;
}