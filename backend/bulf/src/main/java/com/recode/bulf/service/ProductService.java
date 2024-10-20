package com.recode.bulf.service;

import com.recode.bulf.dto.ProductCard;
import com.recode.bulf.model.Product;
import com.recode.bulf.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    private Pageable createPageRequest(int page) {
        return PageRequest.of(page, 20, Sort.by("date").descending());
    }

    public Page<ProductCard> getPagedProducts(int page) {
        return productRepository.findAllReducedProducts(createPageRequest(page));
    }

    public Page<ProductCard> getPagedProductsByGender(int page, Long genderId) {
        return productRepository.findReducedProductsByGender(genderId, createPageRequest(page));
    }

    public Page<ProductCard> getPagedProductsByCategory(int page, Long categoryId) {
        return productRepository.findReducedProductsByCategory(categoryId, createPageRequest(page));
    }
}