package com.abhinav.view_vault.View.Vault.services;

import com.abhinav.view_vault.View.Vault.dto.MovieDto;
import com.abhinav.view_vault.View.Vault.entities.MovieEntity;
import com.abhinav.view_vault.View.Vault.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final ModelMapper modelMapper;

    public List<MovieDto> listAllMovies(){
        List<MovieEntity> movieEntitiesList = movieRepository.findAll();
        return movieEntitiesList.stream().map(movie->modelMapper.map(movie, MovieDto.class)).toList();
    }


}
