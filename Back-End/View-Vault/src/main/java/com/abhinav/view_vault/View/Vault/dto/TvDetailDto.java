package com.abhinav.view_vault.View.Vault.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TvDetailDto {

    @JsonProperty("backdrop_path")
    private String backdrop_path;

    @JsonProperty("episode_run_time")
    private List<Integer> episode_run_time;

    @JsonProperty("first_air_date")
    private String first_air_date;

    // Keep full genre objects (id + name) as in original JSON
    @JsonProperty("genres")
    private List<Genre> genres;

    @JsonProperty("homepage")
    private String homepage;

    @JsonProperty("id")
    private Long id;

    @JsonProperty("in_production")
    private Boolean in_production;

    @JsonProperty("languages")
    private List<String> languages;

    @JsonProperty("last_air_date")
    private String last_air_date;

    @JsonProperty("last_episode_to_air")
    private LastEpisode last_episode_to_air;

    @JsonProperty("name")
    private String name;

    @JsonProperty("next_episode_to_air")
    private Object next_episode_to_air;

    @JsonProperty("number_of_episodes")
    private Integer number_of_episodes;

    @JsonProperty("number_of_seasons")
    private Integer number_of_seasons;

    @JsonProperty("origin_country")
    private List<String> origin_country;

    @JsonProperty("original_language")
    private String original_language;

    @JsonProperty("original_name")
    private String original_name;

    @JsonProperty("overview")
    private String overview;

    @JsonProperty("popularity")
    private Double popularity;

    @JsonProperty("poster_path")
    private String poster_path;

    @JsonProperty("seasons")
    private List<Season> seasons;

    @JsonProperty("status")
    private String status;

    @JsonProperty("tagline")
    private String tagline;

    @JsonProperty("type")
    private String type;

    @JsonProperty("vote_average")
    private Double vote_average;

    @JsonProperty("vote_count")
    private Integer vote_count;

    // Nested helper class for deserializing incoming genre objects
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Genre {
        @JsonProperty("id")
        private Integer id;

        @JsonProperty("name")
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class LastEpisode {
        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("overview")
        private String overview;

        @JsonProperty("vote_average")
        private Double vote_average;

        @JsonProperty("vote_count")
        private Integer vote_count;

        @JsonProperty("air_date")
        private String air_date;

        @JsonProperty("episode_number")
        private Integer episode_number;

        @JsonProperty("production_code")
        private String production_code;

        @JsonProperty("runtime")
        private Integer runtime;

        @JsonProperty("season_number")
        private Integer season_number;

        @JsonProperty("show_id")
        private Integer show_id;

        @JsonProperty("still_path")
        private String still_path;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Season {
        @JsonProperty("air_date")
        private String air_date;

        @JsonProperty("episode_count")
        private Integer episode_count;

        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("overview")
        private String overview;

        @JsonProperty("poster_path")
        private String poster_path;

        @JsonProperty("season_number")
        private Integer season_number;

        @JsonProperty("vote_average")
        private Double vote_average;
    }
}
