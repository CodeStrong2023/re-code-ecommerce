package com.recode.bulf.repository;

import com.recode.bulf.dto.ProductCard;
import com.recode.bulf.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT new com.recode.bulf.dto.ProductCard(p.id, p.name, p.mainImage, p.description, p.price) " +
            "FROM Product p ORDER BY p.date DESC")
    Page<ProductCard> findAllReducedProducts(Pageable pageable);

}