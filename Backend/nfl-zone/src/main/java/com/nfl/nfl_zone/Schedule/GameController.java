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


    @Autowired
    private UpdateSchedule updateSchedule;


    @GetMapping(path = "/byWeek")
    public List<Game> getGamesByWeek(
            @RequestParam() String year,
            @RequestParam() String week,
            @RequestParam() String seasonType) {

        // This endpoint returns all matchups in a given week, year, and seasonType (2 for reg szn, 3 for playoffs)

        // Update the schedule_data.csv and the schedule table in PostgreSQL to obtain the proper matchups in the given week, year, and seasonType
        String updateScheduleCSVResult = updateSchedule.updateScheduleCSVs(year, week, seasonType);
        if (updateScheduleCSVResult.equals("Failure updating CSVs")) {
            return null;
        }
        updateSchedule.updateScheduleDB();


        // Retrieve all the games in that given week
        return gameService.getAllGames();
    }



    @GetMapping(path = "/byTeam")
    public List<Game> getGamesByTeam(
            @RequestParam() String teamName,
            @RequestParam() String year) {

        // This endpoint returns all matchups for a specific team from every week of a single season, including playoffs if applicable
        List<Game> allGamesThisTeam = new ArrayList<>();


        for (int i=1; i<24; i++) {
            // There are a total of 23 weeks in an NFL season (including playoffs, excluding preseason), where week 23 overall is the Super Bowl

            if (i == 22) {
                // Week 22 is the Pro Bowl, which we do not need to extract game data from
                continue;
            }

            int weekNum;
            int seasonType;

            if (i > 18) {
                // This if statement obtains the proper week number when retrieving playoff games
                weekNum = i - 18;
                seasonType = 3; // (playoffs)
            } else {
                weekNum = i;
                seasonType = 2; // (regular season)
            }

            // Update the schedule_data.csv and the schedule table in PostgreSQL to retrieve all matchups containing the requested team from each week in the specified season
            String updateScheduleCSVResult = updateSchedule.updateScheduleCSVs(year, Integer.toString(weekNum), Integer.toString(seasonType));
            if (updateScheduleCSVResult.equals("Failure updating CSVs")) {
                return null;
            }
            updateSchedule.updateScheduleDB();

            // Retrieve the matchup containing the requested team from every week played of a season
            allGamesThisTeam.addAll(gameService.getGameByTeam(teamName));

        }


        return allGamesThisTeam;


    }

}










