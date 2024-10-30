package com.recode.bulf.controller;

import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.recode.bulf.dto.PurchaseRequest;
import com.recode.bulf.service.JwtService;
import com.recode.bulf.service.MercadoPagoService;
import com.recode.bulf.service.ProductService;
import com.recode.bulf.service.PurchaseService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/auth/user")
@AllArgsConstructor
public class UserController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private final MercadoPagoService mercadoPagoService;
    @Autowired
    private final ProductService productService;
    @Autowired
    private final PurchaseService purchaseService;

    @PostMapping("/purchase")
    public ResponseEntity<String> createPurchase(@RequestBody PurchaseRequest purchaseRequest, @RequestHeader("Authorization") final String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!jwtService.isTokenValid(token, purchaseRequest.email())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or email");
        }
        if (productService.isNotStockAvailable(purchaseRequest.products())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient stock for one or more products");
        }
        PreferenceClient client = new PreferenceClient();
        try {
            Preference preference = client.create(mercadoPagoService.processesPay(purchaseRequest));
            return ResponseEntity.ok(preference.getId());
        } catch (MPException e) {
            return ResponseEntity.status(500).body("Error payments preference");
        } catch (MPApiException e) {
            return ResponseEntity.status(500).body("Error payments preference");
        }
    }

    @GetMapping("/purchase")
    public ResponseEntity<?> getPurchaseByUser(@RequestParam String email, @RequestHeader("Authorization") final String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!jwtService.isTokenValid(token, email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or email");
        }

        return ResponseEntity.ok(purchaseService.getPurchaseByEmail(email));
    }

    @GetMapping("/mercado-pago")
    public RedirectView receiveMercadoPagoResponse(
            @RequestParam Long payment_id,
            @RequestParam String status) {
        if (status.equals("approved")) {
            mercadoPagoService.createPurchase(payment_id);
            return new RedirectView("http://localhost:5173/success-purchase");
        }
        return new RedirectView("http://localhost:5173/failed-purchase");
    }

}
