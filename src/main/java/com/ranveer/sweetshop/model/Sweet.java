package com.ranveer.sweetshop.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Entity
@Table(name = "sweets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Sweet name is required")
    @Size(min = 2, max = 100, message = "Sweet name must be between 2 and 100 characters")
    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Category is required")
    @Size(min = 2, max = 50, message = "Category must be between 2 and 50 characters")
    @Column(nullable = false, length = 50)
    private String category;

    @Positive(message = "Price must be greater than 0")
    @Column(nullable = false)
    private double price;

    @Min(value = 0, message = "Quantity cannot be negative")
    @Column(nullable = false)
    private int quantity;

}