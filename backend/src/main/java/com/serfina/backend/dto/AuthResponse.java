package com.serfina.backend.dto;

public record AuthResponse(
        String token,
        String tokenType,
        long expiresIn,
        String email,
        String role
) {
}