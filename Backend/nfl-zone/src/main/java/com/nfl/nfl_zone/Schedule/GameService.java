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

    public List<Game> getGamesByWeek(String weekNum) {
        // Returns all games in a given week of an NFL season
        return gameRepository.findAll().stream()
                .filter(schedule -> weekNum.equals(schedule.getWeekNum()))
                .collect(Collectors.toList());
    }

    public List<Game> getGamesByTeam(String teamName) {
        // Returns the game that contains the requested team in a given week of an NFL season
        return gameRepository.findAll().stream()
                .filter(schedule -> teamName.equals(schedule.getAwayTeam()) || teamName.equals(schedule.getHomeTeam()))
                .collect(Collectors.toList());
    }

    public List<Game> getSpecificMatchup(String team1, String team2) {
        return gameRepository.findAll().stream()
                .filter(schedule -> team1.equals(schedule.getAwayTeam()) && team2.equals(schedule.getHomeTeam()) || team2.equals(schedule.getAwayTeam()) && team1.equals(schedule.getHomeTeam()))
                .collect(Collectors.toList());
    }


}
