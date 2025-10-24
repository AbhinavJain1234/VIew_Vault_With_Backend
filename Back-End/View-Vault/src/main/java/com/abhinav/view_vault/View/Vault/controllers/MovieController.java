package com.abhinav.view_vault.View.Vault.controllers;

import com.abhinav.view_vault.View.Vault.dto.MovieDetailDto;
import com.abhinav.view_vault.View.Vault.dto.MovieDto;
import com.abhinav.view_vault.View.Vault.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDto>> getMovies(){
        return ResponseEntity.ok(movieService.listAllMovies());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<Map<String, Object>> getMoviesByCategory(
            @PathVariable String category,
            @RequestParam(required = false, defaultValue = "day") String timeWindow,
            @RequestParam(required = false) Integer page) {
        return ResponseEntity.ok(movieService.getMoviesByCategory(category, timeWindow, page));
    }

    @GetMapping("/{tmdb_id}")
    public ResponseEntity<MovieDetailDto> getMovieByTmdbId(
            @PathVariable String tmdb_id) {
        return ResponseEntity.ok(movieService.getMovieByTmdbId(tmdb_id));
    }
}
