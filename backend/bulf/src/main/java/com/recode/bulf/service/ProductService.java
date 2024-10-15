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
    public Page<ProductCard> getPagedProducts(int page) {
        Pageable pageable = PageRequest.of(page, 20, Sort.by("date").descending());
        return productRepository.findAllReducedProducts(pageable);
    }

}