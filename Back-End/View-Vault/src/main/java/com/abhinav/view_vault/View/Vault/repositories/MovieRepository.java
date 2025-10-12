package com.abhinav.view_vault.View.Vault.repositories;

import com.abhinav.view_vault.View.Vault.entities.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity, Long> {
}
