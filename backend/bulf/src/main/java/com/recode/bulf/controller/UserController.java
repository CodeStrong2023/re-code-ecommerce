package com.recode.bulf.controller;

import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.recode.bulf.dto.PurchaseRequest;
import com.recode.bulf.service.JwtService;
import com.recode.bulf.service.MercadoPagoService;
import com.recode.bulf.service.UserService;
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
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private final MercadoPagoService mercadoPagoService;

    @PostMapping("/purchase")
    public ResponseEntity<String> createPurchase(@RequestBody PurchaseRequest purchaseRequest, @RequestHeader("Authorization") final String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        if (!jwtService.isTokenValid(token, purchaseRequest.email())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or email");
        }
        userService.processPurchase(purchaseRequest.products(), purchaseRequest.email());
        PreferenceClient client = new PreferenceClient();
        try {
            Preference preference = client.create(mercadoPagoService.processesPay(purchaseRequest));
            System.out.println(preference.getId());
            System.out.println(preference.getPayer().getEmail());

            return ResponseEntity.ok(preference.getId());
        } catch (MPException e) {
            return ResponseEntity.status(500).body("Error payments preference");
        } catch (MPApiException e) {
            return ResponseEntity.status(500).body("Error payments preference");
        }
    }

    @GetMapping("/mercado-pago")
    public RedirectView receiveMercadoPagoResponse(
            @RequestParam Long payment_id
    ) {
        System.out.println("Payment ID: " + payment_id);
        mercadoPagoService.createPurchase(payment_id );

        return new RedirectView("http://localhost:5173/succes-purchase");
    }


}
