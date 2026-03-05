package com.ranveer.sweetshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;

import com.ranveer.sweetshop.repository.UserRepository;
import com.ranveer.sweetshop.model.User;
import com.ranveer.sweetshop.model.Role;

@SpringBootApplication
public class SweetshopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SweetshopApplication.class, args);
    }

   @Bean
CommandLineRunner runner(UserRepository repo, PasswordEncoder encoder) {
    return args -> {
        if (repo.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            repo.save(admin);
        }
    };
}
}