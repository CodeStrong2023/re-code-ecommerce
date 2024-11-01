package com.recode.bulf.service;

import com.recode.bulf.dto.ProductPurchaseDTO;
import com.recode.bulf.dto.PurchaseDTO;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.Purchase;
import com.recode.bulf.model.User;
import com.recode.bulf.repository.PurchaseRepository;
import com.recode.bulf.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PurchaseRepository purchaseRepository;

    public List<PurchaseDTO> getPurchaseByEmail(String email) {
        User user = userRepository.findByEmail(email).get();
        List<Purchase> purchases = purchaseRepository.findPurchasesByUserId(user.getId());
        return response(purchases);
    }

    public List<PurchaseDTO> getAll() {
        return response(purchaseRepository.findAllPurchases());
    }

    private List<PurchaseDTO> response(List<Purchase> purchases) {
        List<PurchaseDTO> response = new ArrayList<>();
        for (Purchase purchase : purchases) {
            List<ProductPurchaseDTO> productsResponse = new ArrayList<>();
            for (Product product : purchase.getProducts()) {
                productsResponse.add(
                        new ProductPurchaseDTO(
                                product.getId(),
                                product.getName(),
                                product.getPrice()
                        )
                );
            }
            response.add(
                    new PurchaseDTO(
                            purchase.getId(),
                            purchase.getPaymentId(),
                            purchase.getTotalCost(),
                            purchase.getStatus(),
                            purchase.getUser().getId(),
                            purchase.getUser().getEmail(),
                            purchase.getUser().getUsername(),
                            productsResponse
                    )
            );
        }
        return response;
    }
}


