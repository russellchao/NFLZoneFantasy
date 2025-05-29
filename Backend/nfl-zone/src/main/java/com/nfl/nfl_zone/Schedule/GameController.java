package com.nfl.nfl_zone.Schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;


@RestController
@RequestMapping(path = "api/v1/schedule")
public class GameController {

    private final GameService gameService;


    public GameController(GameService gameService) {
        this.gameService = gameService;
    }



    @GetMapping
    public List<Game> getGamesByWeek(
            @RequestParam(required = false) String weekNum,
            @RequestParam(required = false) String teamName) {


        if (weekNum != null && teamName == null) {
            // Retrieve all the games in the given week
            return gameService.getGamesByWeek(weekNum);

        } else if (teamName != null && weekNum == null) {
            // Retrieve all the games that contains the given team
            return gameService.getGamesByTeam(teamName);

        } else {
            return null;

        }
    }

}










