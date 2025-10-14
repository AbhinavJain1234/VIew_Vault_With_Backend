package com.abhinav.view_vault.View.Vault.controllers;

import com.abhinav.view_vault.View.Vault.dto.TvInListDto;
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

    @GetMapping("/{category}")
    public ResponseEntity<Map<String, Object>> getTvByCategory(
            @PathVariable String category,
            @RequestParam(required = false, defaultValue = "day") String timeWindow,
            @RequestParam(required = false,defaultValue = "1") Integer page) {
        return ResponseEntity.ok(tvService.getTvByCategory(category, timeWindow, page));
    }
}
