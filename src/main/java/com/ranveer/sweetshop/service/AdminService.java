package com.ranveer.sweetshop.service;

import com.ranveer.sweetshop.dto.AdminStatsResponse;
import com.ranveer.sweetshop.model.Sweet;
import com.ranveer.sweetshop.repository.OrderRepository;
import com.ranveer.sweetshop.repository.SweetRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final OrderRepository orderRepository;
    private final SweetRepository sweetRepository;

    public AdminStatsResponse getStats() {

        long totalOrders = orderRepository.count();

        Double revenue = orderRepository.getTotalRevenue();
        double totalRevenue = revenue == null ? 0 : revenue;

        long totalSweets = sweetRepository.count();

        return new AdminStatsResponse(totalOrders, totalRevenue, totalSweets);
    }

    public List<Sweet> getLowStock() {

        return sweetRepository.findByQuantityLessThan(5);
    }
}