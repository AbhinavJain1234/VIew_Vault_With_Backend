package com.abhinav.view_vault.View.Vault.services;

import com.abhinav.view_vault.View.Vault.dto.MovieDetailDto;
import com.abhinav.view_vault.View.Vault.dto.MovieDto;
import com.abhinav.view_vault.View.Vault.dto.MovieInListDto;
import com.abhinav.view_vault.View.Vault.entities.MovieEntity;
import com.abhinav.view_vault.View.Vault.repositories.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final ModelMapper modelMapper;
    private final TmdbService tmdbService;
    private final ObjectMapper objectMapper;

    public List<MovieDto> listAllMovies(){
        List<MovieEntity> movieEntitiesList = movieRepository.findAll();
        return movieEntitiesList.stream().map(movie->modelMapper.map(movie, MovieDto.class)).toList();
    }

    public Map<String, Object> getMoviesByCategory(String category, String timeWindow, Integer page) {
        String body = tmdbService.getItemsByCategory("movie", category, timeWindow, page);
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

            List<MovieInListDto> movieList = Arrays.asList(
                    objectMapper.treeToValue(resultsNode, MovieInListDto[].class)
            );

            result.put("results", movieList);
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

    public MovieDetailDto getMovieByTmdbId(String tmdbId) {
        String body = tmdbService.getItemDetailsByTmdbId("movie", tmdbId);
        Map<String, String> result = new HashMap<>();
        if(body==null){
            return null;
        }
        try {
            JsonNode root = objectMapper.readTree(body);
            return objectMapper.treeToValue(root, MovieDetailDto.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
