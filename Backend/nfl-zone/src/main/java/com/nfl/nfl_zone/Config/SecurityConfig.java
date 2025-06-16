package com.nfl.nfl_zone.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(requests -> requests
                .requestMatchers(
                    "/api/v1/schedule/**",
                    "/api/v1/passer/**",
                    "/api/v1/rusher/**",
                    "/api/v1/receiver/**",
                    "/api/v1/defender/**",
                    "/api/v1/kicker/**",
                    "/api/v1/playerName/**",
                    "api/v1/updateSchedule",
                    "api/v1/updatePlayerStats",
                    "/api/v1/auth/register",
                    "/api/v1/auth/login"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable()); // Modern syntax for disabling CSRF

        return http.build();
    }
}
