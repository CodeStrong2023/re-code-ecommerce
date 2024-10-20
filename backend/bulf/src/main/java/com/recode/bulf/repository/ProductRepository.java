package com.recode.bulf.repository;

import com.recode.bulf.dto.ProductCard;
import com.recode.bulf.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT new com.recode.bulf.dto.ProductCard(p.id, p.name, p.mainImage, p.description, p.price) " +
            "FROM Product p ORDER BY p.date DESC")
    Page<ProductCard> findAllReducedProducts(Pageable pageable);

    @Query("SELECT new com.recode.bulf.dto.ProductCard(p.id, p.name, p.mainImage, p.description, p.price) " +
            "FROM Product p WHERE p.genderId = :genderId ORDER BY p.date DESC")
    Page<ProductCard> findReducedProductsByGender(@Param("genderId") Long genderId, Pageable pageable);

    @Query("SELECT new com.recode.bulf.dto.ProductCard(p.id, p.name, p.mainImage, p.description, p.price) " +
            "FROM Product p WHERE p.categoryId = :categoryId ORDER BY p.date DESC")
    Page<ProductCard> findReducedProductsByCategory(@Param("categoryId") Long categoryId, Pageable pageable);
}