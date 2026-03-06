package com.ranveer.sweetshop.dto;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long sweetId;
    private int quantity;

}