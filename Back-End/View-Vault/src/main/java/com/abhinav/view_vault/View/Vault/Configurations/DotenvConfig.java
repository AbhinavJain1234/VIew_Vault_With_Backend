package com.abhinav.view_vault.View.Vault.Configurations;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {
    private static final Logger log = LoggerFactory.getLogger(DotenvConfig.class);

    @Bean
    public Dotenv dotenv() {
        String projectRoot = System.getProperty("user.dir");
        log.info("Loading .env from project root: {}", projectRoot);
        Dotenv dotenv = Dotenv.configure()
                .directory(projectRoot)
                .filename(".env")
                .ignoreIfMissing()
                .load();
        if (dotenv.entries().isEmpty()) {
            log.warn("No .env entries found. Make sure .env exists at project root or provide required properties via other means.");
        }
        return dotenv;
    }
}

