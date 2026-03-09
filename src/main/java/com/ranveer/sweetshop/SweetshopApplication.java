package com.ranveer.sweetshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.ranveer.sweetshop.repository.UserRepository;
import com.ranveer.sweetshop.model.User;
import com.ranveer.sweetshop.model.Role;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class SweetshopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SweetshopApplication.class, args);
    }

    /* =========================
       Create Default Admin User
    ========================= */

    @Bean
    CommandLineRunner createAdmin(UserRepository repo, PasswordEncoder encoder) {

        return args -> {

            if (repo.findByUsername("admin").isEmpty()) {

                User admin = User.builder()
                        .username("admin")
                        .password(encoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .build();

                repo.save(admin);

                log.info("Default admin user created: username=admin");
            }
        };
    }
}