package com.nfl.nfl_zone.Schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<Schedule> getAllGames() {
        // Returns all games in a given week of an NFL season
        return scheduleRepository.findAll();
    }

    public List<Schedule> getGameByTeam(String teamName) {
        // Returns the game that contains the requested team in a given week of an NFL season
        return scheduleRepository.findAll().stream()
                .filter(schedule -> teamName.equals(schedule.getAwayTeam()) || teamName.equals(schedule.getHomeTeam()))
                .collect(Collectors.toList());
    }



}
