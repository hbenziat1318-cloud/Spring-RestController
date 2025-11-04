package com.example.demo.config;



import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI banqueAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Banque")
                        .description("Documentation de l’API de gestion des comptes bancaires")
                        .version("1.0.0"));
    }
}
