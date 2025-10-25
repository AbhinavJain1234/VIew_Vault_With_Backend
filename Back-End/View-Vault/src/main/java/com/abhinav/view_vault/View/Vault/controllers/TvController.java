package com.abhinav.view_vault.View.Vault.controllers;

import com.abhinav.view_vault.View.Vault.dto.*;
import com.abhinav.view_vault.View.Vault.services.TvService;
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
@RequestMapping("/tv")
public class TvController {

    private final TvService tvService;

    @GetMapping("/category/{category}")
    public ResponseEntity<Map<String, Object>> getTvByCategory(
            @PathVariable String category,
            @RequestParam(required = false, defaultValue = "day") String timeWindow,
            @RequestParam(required = false,defaultValue = "1") Integer page) {
        return ResponseEntity.ok(tvService.getTvByCategory(category, timeWindow, page));
    }
    @GetMapping("/{tmdb_id}")
    public ResponseEntity<TvDetailDto> getTvByTmdbId(
            @PathVariable String tmdb_id) {
        return ResponseEntity.ok(tvService.getTvByTmdbId(tmdb_id));
    }
    @GetMapping("/{tmdb_id}/season/{season_number}")
    public ResponseEntity<TvSeasonDetailDto> getTvSeasonByTmdbId(
            @PathVariable String tmdb_id, @PathVariable String season_number) {
        return ResponseEntity.ok(tvService.getSeasonDetail(tmdb_id,season_number));
    }
    @GetMapping("/{tmdb_id}/season/{season_number}/episode/{episode_number}")
    public ResponseEntity<TvSeasonEpisodeDetailDto> getTvSeasonEpisodeByTmdbId(
            @PathVariable String tmdb_id, @PathVariable String season_number, @PathVariable String episode_number) {
        return ResponseEntity.ok(tvService.getSeasonEpisodeDetail(tmdb_id,season_number,episode_number));
    }
}
