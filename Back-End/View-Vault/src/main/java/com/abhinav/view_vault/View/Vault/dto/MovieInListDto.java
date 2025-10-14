package com.abhinav.view_vault.View.Vault.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieInListDto {
    @JsonProperty("id")
    private Long tmdbId;

    private String title;

    @JsonProperty("original_title")
    private String originalTitle;

    private String overview;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("vote_average")
    private Double voteAverage;

    @JsonProperty("vote_count")
    private Integer voteCount;

    @JsonProperty("backdrop_path")
    private String backdropPath;

    private Boolean adult;

    @JsonProperty("original_language")
    private String originalLanguage;

    private Double popularity;

    @JsonProperty("media_type")
    private String mediaType;

    @JsonProperty("genre_ids")
    private List<Integer> genreIds;

    private Boolean video;
}
