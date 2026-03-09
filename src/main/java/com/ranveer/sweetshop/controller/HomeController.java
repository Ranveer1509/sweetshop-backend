package com.ranveer.sweetshop.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/home")
    public Map<String, String> home() {

        return Map.of(
                "message", "Sweet Shop API Running"
        );

    }
}