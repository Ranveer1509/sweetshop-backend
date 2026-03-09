package com.ranveer.sweetshop.dto;

import lombok.Data;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Data
public class OrderItemRequest {

    @NotNull(message = "Sweet ID is required")
    private Long sweetId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

}