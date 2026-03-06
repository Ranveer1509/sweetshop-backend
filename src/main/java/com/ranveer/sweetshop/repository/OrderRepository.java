package com.ranveer.sweetshop.repository;

import com.ranveer.sweetshop.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUsername(String username);

     @Query("SELECT SUM(o.totalAmount) FROM Order o")
      Double getTotalRevenue();

}