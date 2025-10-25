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
public class TvSeasonEpisodeDetailDto {

    @JsonProperty("air_date")
    private String air_date;

    @JsonProperty("crew")
    private List<Person> crew;

    @JsonProperty("episode_number")
    private Integer episode_number;

    @JsonProperty("guest_stars")
    private List<Person> guest_stars;

    @JsonProperty("name")
    private String name;

    @JsonProperty("overview")
    private String overview;

    @JsonProperty("id")
    private Long id;

    @JsonProperty("production_code")
    private String production_code;

    @JsonProperty("runtime")
    private Integer runtime;

    @JsonProperty("season_number")
    private Integer season_number;

    @JsonProperty("still_path")
    private String still_path;

    @JsonProperty("vote_average")
    private Double vote_average;

    @JsonProperty("vote_count")
    private Integer vote_count;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Person {
        @JsonProperty("department")
        private String department;

        @JsonProperty("job")
        private String job;

        @JsonProperty("credit_id")
        private String credit_id;

        @JsonProperty("adult")
        private Boolean adult;

        @JsonProperty("gender")
        private Integer gender;

        @JsonProperty("id")
        private Long id;

        @JsonProperty("known_for_department")
        private String known_for_department;

        @JsonProperty("name")
        private String name;

        @JsonProperty("original_name")
        private String original_name;

        @JsonProperty("popularity")
        private Double popularity;

        @JsonProperty("profile_path")
        private String profile_path;

        // guest-star specific
        @JsonProperty("character")
        private String character;

        @JsonProperty("order")
        private Integer order;
    }
}
