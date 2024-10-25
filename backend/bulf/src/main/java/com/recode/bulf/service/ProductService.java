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
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        product.setDate(LocalDateTime.now());
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    private Pageable createPageRequest(int page, int size, String type) {
        return PageRequest.of(page, size, Sort.by(type).descending());
    }

    public Page<ProductCard> getPagedProducts(int page) {
        return productRepository.findAllReducedProducts(
                createPageRequest(page, 20, "date")
        );
    }

    public Page<ProductCard> getPagedProductsByGender(int page, Long genderId) {
        return productRepository.findReducedProductsByGender(
                genderId,
                createPageRequest(page, 20, "date")
        );
    }

    public Page<ProductCard> getPagedProductsByCategory(int page, Long categoryId) {
        return productRepository.findReducedProductsByCategory(
                categoryId,
                createPageRequest(page, 20, "date")
        );
    }

    public Page<Product> getPagedProducts(int page, int size) {
        return productRepository.findAllOrderedByIdDesc(createPageRequest(page, size, "id"));
    }
    public boolean deleteProductById(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> existingProductOpt = productRepository.findById(id);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setStock(updatedProduct.getStock());
            existingProduct.setMainImage(updatedProduct.getMainImage());
            existingProduct.setImages(updatedProduct.getImages());
            existingProduct.setGenderId(updatedProduct.getGenderId());
            existingProduct.setCategoryId(updatedProduct.getCategoryId());
            existingProduct.setSubcategoryId(updatedProduct.getSubcategoryId());
            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }
}