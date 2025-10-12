package com.abhinav.view_vault.View.Vault.Configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TmdbConfig {

    @Value("${tmdb.api.base-url}")
    private String baseUrl;

    @Value("${tmdb.api.token}")
    private String apiToken;

    public String getBaseUrl() {
        return baseUrl;
    }

    public String getApiToken() {
        return apiToken;
    }
}
