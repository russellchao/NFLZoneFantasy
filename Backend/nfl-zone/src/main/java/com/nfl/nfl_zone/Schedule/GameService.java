package com.nfl.nfl_zone.Schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getAllGames() {
        // Returns all games in a given week of an NFL season
        return gameRepository.findAll();
    }

    public List<Game> getGameByTeam(String teamName) {
        // Returns the game that contains the requested team in a given week of an NFL season
        return gameRepository.findAll().stream()
                .filter(schedule -> teamName.equals(schedule.getAwayTeam()) || teamName.equals(schedule.getHomeTeam()))
                .collect(Collectors.toList());
    }



}
