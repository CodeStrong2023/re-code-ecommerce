package com.recode.bulf.controller;

public record RegisterRequest(
        String username,
        String email,
        String password
) {
}