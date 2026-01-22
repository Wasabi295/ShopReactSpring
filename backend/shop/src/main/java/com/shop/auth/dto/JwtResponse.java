package com.shop.auth.dto;

public record JwtResponse(String token, String role, Long userId, String username) {}