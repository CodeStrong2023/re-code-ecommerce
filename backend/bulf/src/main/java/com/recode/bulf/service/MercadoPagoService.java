package com.recode.bulf.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.recode.bulf.dto.ProductPurchase;
import com.recode.bulf.dto.PurchaseRequest;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.Purchase;
import com.recode.bulf.model.User;
import com.recode.bulf.repository.ProductRepository;
import com.recode.bulf.repository.PurchaseRepository;
import com.recode.bulf.repository.UserRepository;
import com.recode.bulf.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MercadoPagoService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ProductRepository productRepository;
    @Autowired
    private final PurchaseRepository purchaseRepository;
    @Value("${application.security.mercado-pago.token}")
    private String mercadoPagoToken;

    public void createPurchase(Long paymentId) {
        Optional<HttpResponse<String>> responseOptional = Utils.getPayments(paymentId, mercadoPagoToken);
        if (responseOptional.isPresent()) {
            HttpResponse<String> response = responseOptional.get();
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode jsonNode = mapper.readTree(response.body());
                List<Product> products = new ArrayList<>();
                User user = userRepository.findByUsername(
                        jsonNode.
                                path("additional_info").
                                path("payer").
                                path("first_name").
                                asText()
                ).get();
                Purchase purchase = new Purchase();
                JsonNode items = jsonNode.path("additional_info").path("items");
                for (JsonNode item : items) {
                    Product product = productRepository.findById(item.path("id").asLong()).get();
                    for (int i = 0; i < item.path("quantity").asInt(); i++) {
                        products.add(product);
                    }
                }
                purchase.setPaymentId(jsonNode.path("id").asLong());
                purchase.setStatus(jsonNode.path("status").asText());
                purchase.setPaymentType(jsonNode.path("payment_type_id").asText());
                purchase.setPreferenceId(jsonNode.path("preference_id").asText());
                purchase.setTotalCost(jsonNode.path("transaction_amount").asDouble());
                purchase.setUser(user);
                purchase.setProducts(products);
                purchaseRepository.save(purchase);
            } catch (JsonMappingException e) {
                throw new RuntimeException(e);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public PreferenceRequest processesPay(PurchaseRequest purchaseRequest) {
        List<ProductPurchase> productsPurchase = purchaseRequest.products();
        User user = userRepository.findByEmail(purchaseRequest.email()).get();
        MercadoPagoConfig.setAccessToken(mercadoPagoToken);
        List<PreferenceItemRequest> items = new ArrayList<>();
        for (ProductPurchase productPurchase : productsPurchase) {
            Product product = productRepository.findById(productPurchase.id()).get();
            PreferenceItemRequest itemRequest = PreferenceItemRequest
                    .builder()
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
        System.out.println(payer.toString());
        PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.
                builder()
                .failure("http://localhost:8080/api/auth/user/mercado-pago")
                .success("http://localhost:8080/api/auth/user/mercado-pago")
                .pending("http://localhost:8080/api/auth/user/mercado-pago")
                .build();
        PreferenceRequest preferenceRequest = PreferenceRequest
                .builder()
                .items(items)
                .payer(payer)
                .backUrls(backUrls)
                .autoReturn("approved")
                .notificationUrl("https://www.youtube.com/")
                .build();
        return preferenceRequest;
    }




}
