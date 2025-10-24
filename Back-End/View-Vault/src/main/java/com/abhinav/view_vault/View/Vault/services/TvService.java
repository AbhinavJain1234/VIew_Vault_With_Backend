package com.abhinav.view_vault.View.Vault.services;

import com.abhinav.view_vault.View.Vault.dto.MovieDetailDto;
import com.abhinav.view_vault.View.Vault.dto.TvDetailDto;
import com.abhinav.view_vault.View.Vault.dto.TvInListDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TvService {

    private final TmdbService tmdbService;
    private final ObjectMapper objectMapper;

    public Map<String, Object> getTvByCategory(String category, String timeWindow, Integer page) {
        String body = tmdbService.getItemsByCategory("tv", category, timeWindow, page);
        Map<String, Object> result = new HashMap<>();

        if (body == null || body.isEmpty()) {
            result.put("results", List.of());
            result.put("page", page != null ? page : 1);
            result.put("total_pages", 0);
            return result;
        }

        try {
            JsonNode root = objectMapper.readTree(body);
            JsonNode resultsNode = root.path("results");
            int currentPage = root.path("page").asInt(page != null ? page : 1);
            int totalPages = root.path("total_pages").asInt(0);

            List<TvInListDto> tvList = Arrays.asList(
                    objectMapper.treeToValue(resultsNode, TvInListDto[].class)
            );

            result.put("results", tvList);
            result.put("page", currentPage);
            result.put("total_pages", totalPages);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            result.put("results", List.of());
            result.put("page", page != null ? page : 1);
            result.put("total_pages", 0);
            return result;
        }
    }

    public TvDetailDto getMovieByTmdbId(String tmdbId) {
        String body = tmdbService.getItemDetailsByTmdbId("tv", tmdbId);
        Map<String, String> result = new HashMap<>();
        if(body==null){
            return null;
        }
        try {
            JsonNode root = objectMapper.readTree(body);
            return objectMapper.treeToValue(root, TvDetailDto.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
