package com.serfina.backend.config;

import com.serfina.backend.model.Role;
import com.serfina.backend.model.User;
import com.serfina.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(
                        new User(
                                "admin@serfina.com",
                                passwordEncoder.encode("Admin123!"),
                                Role.ADMIN
                        )
                );

                userRepository.save(
                        new User(
                                "user@serfina.com",
                                passwordEncoder.encode("User123!"),
                                Role.USER
                        )
                );
            }
        };
    }
}