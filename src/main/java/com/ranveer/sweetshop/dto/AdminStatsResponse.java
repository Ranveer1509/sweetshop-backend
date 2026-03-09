package com.ranveer.sweetshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminStatsResponse {

    private long totalSweets;
    private long totalOrders;
    private double totalRevenue;
    private long lowStockItems;

}