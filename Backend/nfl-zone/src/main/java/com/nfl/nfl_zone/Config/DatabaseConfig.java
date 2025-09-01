package com.nfl.nfl_zone.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Autowired(required = false)
    private SecretManagerService secretManagerService;

    @Bean
    @Primary
    @Profile("prod")
    public DataSource productionDataSource() {
        return DataSourceBuilder.create()
                .url(secretManagerService.getSecret("db-url"))
                .username(secretManagerService.getSecret("db-username"))
                .password(secretManagerService.getSecret("db-password"))
                .driverClassName("org.postgresql.Driver")
                .build();
    }

    @Bean
    @Profile("!prod")
    public DataSource developmentDataSource() {
        // This will use your existing application.properties configuration
        // with environment variables from .env file
        return DataSourceBuilder.create()
                .url(System.getenv("DB_URL"))
                .username(System.getenv("DB_USERNAME"))
                .password(System.getenv("DB_PASSWORD"))
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
