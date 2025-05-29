package com.nfl.nfl_zone.Schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, String> {
    void deleteByGameId(String gameId);
    Optional<Game> findByGameId(String gameId);
}
