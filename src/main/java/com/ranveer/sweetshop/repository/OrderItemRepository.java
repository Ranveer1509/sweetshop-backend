package com.ranveer.sweetshop.repository;

import com.ranveer.sweetshop.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}