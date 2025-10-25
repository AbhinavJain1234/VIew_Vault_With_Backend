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
public class TvSeasonDetailDto {

    @JsonProperty("_id")
    private String _id;

    @JsonProperty("air_date")
    private String air_date;

    @JsonProperty("episodes")
    private List<Episode> episodes;

    @JsonProperty("name")
    private String name;

    @JsonProperty("networks")
    private List<Network> networks;

    @JsonProperty("overview")
    private String overview;

    @JsonProperty("id")
    private Long id;

    @JsonProperty("poster_path")
    private String poster_path;

    @JsonProperty("season_number")
    private Integer season_number;

    @JsonProperty("vote_average")
    private Double vote_average;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Episode {
        @JsonProperty("air_date")
        private String air_date;

        @JsonProperty("episode_number")
        private Integer episode_number;

        @JsonProperty("episode_type")
        private String episode_type;

        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("overview")
        private String overview;

        @JsonProperty("production_code")
        private String production_code;

        @JsonProperty("runtime")
        private Integer runtime;

        @JsonProperty("season_number")
        private Integer season_number;

        @JsonProperty("show_id")
        private Long show_id;

        @JsonProperty("still_path")
        private String still_path;

        @JsonProperty("vote_average")
        private Double vote_average;

        @JsonProperty("vote_count")
        private Integer vote_count;

        @JsonProperty("crew")
        private List<Person> crew;

        @JsonProperty("guest_stars")
        private List<Person> guest_stars;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Person {
        // fields used both for crew and guest stars
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

        // guest star specific fields
        @JsonProperty("character")
        private String character;

        @JsonProperty("order")
        private Integer order;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Network {
        @JsonProperty("id")
        private Long id;

        @JsonProperty("logo_path")
        private String logo_path;

        @JsonProperty("name")
        private String name;

        @JsonProperty("origin_country")
        private String origin_country;
    }
}
