package com.ranveer.sweetshop.service;

import com.ranveer.sweetshop.dto.AdminStatsResponse;
import com.ranveer.sweetshop.repository.OrderRepository;
import com.ranveer.sweetshop.repository.SweetRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final SweetRepository sweetRepository;
    private final OrderRepository orderRepository;

    public AdminStatsResponse getStats() {

        long totalSweets = sweetRepository.count();

        long totalOrders = orderRepository.count();

        double totalRevenue = orderRepository.findAll()
                .stream()
                .mapToDouble(order -> order.getTotalAmount())
                .sum();

        long lowStockItems = sweetRepository.findAll()
                .stream()
                .filter(sweet -> sweet.getQuantity() < 10)
                .count();

        return AdminStatsResponse.builder()
                .totalSweets(totalSweets)
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue)
                .lowStockItems(lowStockItems)
                .build();
    }
}