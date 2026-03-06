package com.ranveer.sweetshop.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI sweetShopAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sweet Shop API")
                        .description("Sweet Shop Management System Backend")
                        .version("1.0"));
    }
}