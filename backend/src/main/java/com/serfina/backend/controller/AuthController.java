package com.serfina.backend.controller;

import com.serfina.backend.dto.AuthResponse;
import com.serfina.backend.dto.LoginRequest;
import com.serfina.backend.model.User;
import com.serfina.backend.repository.UserRepository;
import com.serfina.backend.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${security.jwt.expiration-ms}")
    private long expirationMs;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.email(),
                                request.password()
                        )
                );

        User user = userRepository.findByEmailIgnoreCase(
                authentication.getName()
        ).orElseThrow();

        String token = jwtService.generateToken(
                (org.springframework.security.core.userdetails.User)
                        authentication.getPrincipal()
        );

        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        "Bearer",
                        expirationMs,
                        user.getEmail(),
                        user.getRole().name()
                )
        );
    }
}