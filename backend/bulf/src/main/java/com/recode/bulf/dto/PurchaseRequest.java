package com.recode.bulf.dto;


import java.util.List;

public record PurchaseRequest(List<ProductPurchase> products, String email) {
}
