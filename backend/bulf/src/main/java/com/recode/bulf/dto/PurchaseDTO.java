package com.recode.bulf.dto;

import java.util.List;

public record PurchaseDTO(
        Long id,
        Long paymentId,
        Double totalCost,
        String status,
        Integer userId,
        String userEmail,
        String userName,
        List<ProductPurchaseDTO> products) {
}
