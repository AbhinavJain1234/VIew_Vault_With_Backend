package com.abhinav.view_vault.View.Vault.controllers;

import com.abhinav.view_vault.View.Vault.dto.MovieDto;
import com.abhinav.view_vault.View.Vault.entities.MovieEntity;
import com.abhinav.view_vault.View.Vault.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDto>> getMovies(){
        return ResponseEntity.ok(movieService.listAllMovies());
    }
    @GetMapping("/popular")
    public List<MovieDto> getAllPopularMovies(){
        return movieService.getAllPopularMovies();
    }
}
