package com.abhinav.view_vault.View.Vault.services;

import com.abhinav.view_vault.View.Vault.Configurations.RestTemplateConfig;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TmdbService {

    private final RestTemplate restTemplate;
    private final Dotenv dotenv = Dotenv.configure().load();

    // Valid categories for movies
    private static final List<String> MOVIE_CATEGORIES = Arrays.asList(
            "trending", "popular", "top_rated", "upcoming", "now_playing"
    );

    // Valid categories for TV series
    private static final List<String> TV_CATEGORIES = Arrays.asList(
            "trending", "popular", "top_rated", "airing_today", "on_the_air"
    );

    private String getBaseUrl() {
        return dotenv.get("tmdb.api.base-url");
    }

    private String getApiToken() {
        return dotenv.get("tmdb.api.token");
    }

    public String getItemsByCategory(String mediaType, String category, String timeWindow, Integer page) {
        // Validate mediaType
        if (!"movie".equalsIgnoreCase(mediaType) && !"tv".equalsIgnoreCase(mediaType)) {
            System.err.println("Invalid media type: " + mediaType + ". Must be 'movie' or 'tv'");
            return null;
        }

        // Validate category based on mediaType
        List<String> validCategories = "movie".equalsIgnoreCase(mediaType) ? MOVIE_CATEGORIES : TV_CATEGORIES;
        if (!validCategories.contains(category.toLowerCase())) {
            System.err.println("Invalid category '" + category + "' for " + mediaType + ". Valid categories: " + validCategories);
            return null;
        }

        // Build URL
        String url;
        if ("trending".equalsIgnoreCase(category)) {
            if (timeWindow == null || timeWindow.trim().isEmpty()) {
                System.err.println("Time window is required for trending category");
                return null;
            }
            url = getBaseUrl() + "/trending/" + mediaType.toLowerCase() + "/" + timeWindow + "?language=en-US";
        } else {
            url = getBaseUrl() + "/" + mediaType.toLowerCase() + "/" + category.toLowerCase() + "?language=en-US";
        }

        // Add page parameter if provided
        if (page != null && page > 0) {
            url += "&page=" + page;
        }
        System.out.println(url);

//        String url="https://api.themoviedb.org/3/trending/movie/day";
        return makeApiCall(url, HttpMethod.GET, null);
    }

    // Overloaded method for backward compatibility
    public String getItemsByCategory(String mediaType, String category, String timeWindow) {
        return getItemsByCategory(mediaType, category, timeWindow, null);
    }

    // Keep for backward compatibility
    public String getTrendingMovies() {
        return getItemsByCategory("movie", "trending", "day");
    }

    // Keep for backward compatibility
    public String getMoviesByCategory(String category, String timeWindow) {
        return getItemsByCategory("movie", category, timeWindow);
    }

    private String makeApiCall(String url, HttpMethod method, Object body) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + getApiToken());
            headers.set("accept", "application/json");
            HttpEntity<Object> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.exchange(url, method, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error during API call: " + e.getMessage());
            return null;
        }
    }
}