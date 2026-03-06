package com.ranveer.sweetshop.repository;

import com.ranveer.sweetshop.model.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SweetRepository extends JpaRepository<Sweet, Long> {
    boolean existsByNameIgnoreCase(String name);
    List<Sweet> findByQuantityLessThan(int quantity);

    List<Sweet> findByNameContainingIgnoreCaseAndCategoryIgnoreCaseAndPriceBetween(
            String name,
            String category,
            double minPrice,
            double maxPrice
    );
}
