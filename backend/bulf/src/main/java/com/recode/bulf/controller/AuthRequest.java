package com.recode.bulf.controller;

public record AuthRequest(
        String email,
        String password
) {
}
