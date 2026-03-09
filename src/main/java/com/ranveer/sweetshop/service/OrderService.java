package com.ranveer.sweetshop.service;

import com.ranveer.sweetshop.dto.OrderRequest;
import com.ranveer.sweetshop.dto.OrderItemRequest;
import com.ranveer.sweetshop.model.*;
import com.ranveer.sweetshop.repository.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final SweetRepository sweetRepository;

    /* =========================
       Place Order
    ========================= */

    public Order placeOrder(String username, OrderRequest request) {

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderItemRequest itemRequest : request.getItems()) {

            Sweet sweet = sweetRepository.findById(itemRequest.getSweetId())
                    .orElseThrow(() -> new RuntimeException("Sweet not found"));

            if (sweet.getQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }

            /* Update stock */
            sweet.setQuantity(sweet.getQuantity() - itemRequest.getQuantity());
            sweetRepository.save(sweet);

            double price = sweet.getPrice() * itemRequest.getQuantity();

            OrderItem orderItem = OrderItem.builder()
                    .sweetId(sweet.getId())
                    .sweetName(sweet.getName())
                    .quantity(itemRequest.getQuantity())
                    .price(price)
                    .build();

            items.add(orderItem);
            total += price;
        }

        Order order = Order.builder()
                .username(username)
                .orderDate(LocalDateTime.now())
                .status("PLACED")
                .totalAmount(total)
                .items(items)
                .build();

        items.forEach(i -> i.setOrder(order));

        log.info("Order placed by {} with total {}", username, total);

        return orderRepository.save(order);
    }

    /* =========================
       Get User Orders
    ========================= */

    public List<Order> getUserOrders(String username) {
        return orderRepository.findByUsername(username);
    }

    /* =========================
       Get All Orders (Admin)
    ========================= */

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /* =========================
       Update Order Status
    ========================= */

    public Order updateStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        log.info("Order {} status updated to {}", id, status);

        return orderRepository.save(order);
    }

    /* =========================
       Generate Invoice
    ========================= */

    public Map<String, Object> getInvoice(String username, Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized access to invoice");
        }

        Map<String, Object> invoice = new HashMap<>();

        double subtotal = order.getTotalAmount();
        double tax = subtotal * 0.05;
        double total = subtotal + tax;

        invoice.put("orderId", order.getId());
        invoice.put("username", order.getUsername());
        invoice.put("date", order.getOrderDate());
        invoice.put("subtotal", subtotal);
        invoice.put("tax", tax);
        invoice.put("total", total);
        invoice.put("items", order.getItems());

        return invoice;
    }
}