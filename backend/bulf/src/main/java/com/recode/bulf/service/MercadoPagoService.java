package com.recode.bulf.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.recode.bulf.dto.ProductPurchase;
import com.recode.bulf.dto.PurchaseRequest;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.User;
import com.recode.bulf.repository.ProductRepository;
import com.recode.bulf.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MercadoPagoService {
    @Autowired

    private final UserRepository userRepository;
    @Autowired
    private final ProductRepository productRepository;



    public PreferenceRequest processesPay(PurchaseRequest purchaseRequest) {
        List<ProductPurchase> productsPurchase = purchaseRequest.products();
        User user = userRepository.findByEmail(purchaseRequest.email()).get();
        MercadoPagoConfig.setAccessToken("TEST-7352276468196320-102718-237f0be1917cd25d0b194a1342a04c08-187606246");
        List<PreferenceItemRequest> items = new ArrayList<>();
        for (ProductPurchase productPurchase : productsPurchase) {
            Product product = productRepository.findById(productPurchase.id()).get();
            PreferenceItemRequest itemRequest =
                    PreferenceItemRequest.builder()
                            .id(String.valueOf(product.getId()))
                            .title(product.getName())
                            .description(product.getDescription())
                            .quantity(productPurchase.quantity())
                            .currencyId("ARG")
                            .unitPrice(new BigDecimal(product.getPrice()))
                            .build();
            items.add(itemRequest);
        }
        PreferencePayerRequest payer = PreferencePayerRequest
                .builder()
                .name(user.getUsername())
                .email(user.getEmail())
                .build();
        PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest
                .builder()
                .failure("http://localhost:5173/home")
                .success("http://localhost:5173/home")
                .pending("http://localhost:5173/home")
                .build();
        PreferenceRequest preferenceRequest = PreferenceRequest
                .builder()
                .items(items)
                .payer(payer)
                .backUrls(backUrls)
                .autoReturn("approved")
                .notificationUrl("http://localhost:5173/home")
                .build();
        return preferenceRequest;
    }
}