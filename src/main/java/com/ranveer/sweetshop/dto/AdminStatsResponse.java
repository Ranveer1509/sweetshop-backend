package com.ranveer.sweetshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsResponse {

    private long totalOrders;
    private double totalRevenue;
    private long totalSweets;
}