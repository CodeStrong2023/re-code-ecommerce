package com.recode.bulf.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recode.bulf.model.Purchase;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public final class Utils {

    private Utils(){};
    public static Optional<HttpResponse<String>> getPayments(Long paymentId, String mercadoPagoToken) {
        String uri = "https://api.mercadopago.com/v1/payments/" + paymentId;
        Map<String, List<String>> headers = Map.of(
                "Content-Type", List.of("application/json"),
                "Authorization", List.of("Bearer " + mercadoPagoToken)
        );
        return HttpConnection.get(uri, headers);
    }
}
