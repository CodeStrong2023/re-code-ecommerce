package com.recode.bulf.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.recode.bulf.dto.ProductPurchase;
import com.recode.bulf.dto.PurchaseRequest;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.User;
import com.recode.bulf.repository.ProductRepository;
import com.recode.bulf.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    @Value("${application.security.mercado-pago.token}")
    private String mercadoPagoToken;


    public PreferenceRequest processesPay(PurchaseRequest purchaseRequest) {
        List<ProductPurchase> productsPurchase = purchaseRequest.products();
        User user = userRepository.findByEmail(purchaseRequest.email()).get();
        MercadoPagoConfig.setAccessToken(mercadoPagoToken);
        List<PreferenceItemRequest> items = new ArrayList<>();
        for (ProductPurchase productPurchase : productsPurchase) {
            Product product = productRepository.findById(productPurchase.id()).get();
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder().id(String.valueOf(product.getId())).title(product.getName()).description(product.getDescription()).quantity(productPurchase.quantity()).currencyId("ARG").unitPrice(new BigDecimal(product.getPrice())).build();
            items.add(itemRequest);
        }
        PreferencePayerRequest payer = PreferencePayerRequest.builder().name(user.getUsername()).email(user.getEmail()).build();
        PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder().failure("https://github.com/ivorossi").success("http://localhost:5173/home").pending("https://jkanime.net").build();
        PreferenceRequest preferenceRequest = PreferenceRequest.builder().items(items).payer(payer).backUrls(backUrls).autoReturn("approved").notificationUrl("https://www.youtube.com/").build();
        return preferenceRequest;
    }
}
