package com.recode.bulf.dto;

public record RegisterRequest(
        String username,
        String email,
        String password
) {
}