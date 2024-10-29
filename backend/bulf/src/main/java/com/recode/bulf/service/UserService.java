package com.recode.bulf.service;

import com.recode.bulf.dto.ProductPurchase;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.User;
import com.recode.bulf.repository.ProductRepository;
import com.recode.bulf.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ProductRepository productRepository;

    public void processPurchase(List<ProductPurchase> productsPurchase, String email) {
        User user = userRepository.findByEmail(email).get();
        List<Product> products = new ArrayList<>();
        for (ProductPurchase productPurchase : productsPurchase) {
            Product product = productRepository.findById(productPurchase.id()).get();
            for (int i = 0; i < productPurchase.quantity(); i++) {
                products.add(product);
            }
        }
        for (Product product : products) {
            product.purchase();
        }
        productRepository.saveAll(products);
    }
}
