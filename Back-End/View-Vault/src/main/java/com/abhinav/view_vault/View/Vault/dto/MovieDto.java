package com.abhinav.view_vault.View.Vault.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {
    private Long id;
    private String name;
    private String movie_id;
    private String description;
    private List<String> genres;
}
