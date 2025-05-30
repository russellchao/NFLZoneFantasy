package com.nfl.nfl_zone.Schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.opencsv.CSVReader;
import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/updateSchedule")
public class UpdateScheduleController {

    @GetMapping
    public String updateScheduleCSVs(@RequestParam() String year) {
        // Call the Python Flask Endpoint to Update the CSV file containing the matchups from the given week, year, and season type

        String flaskURL = String.format("http://localhost:5000/scheduleData/%s", year);
        RestTemplate restTemplate = new RestTemplate();

        try {
            String response = restTemplate.getForObject(flaskURL, String.class);
            System.out.println("Flask Response: " + response);

            // When the user tries to retrieve player stats from a season that's not available
            if (response.equals("Failure updating schedule data")) {
                return "Failure updating CSVs";
            }

            System.out.println("Success");

            // Update the schedule table in PostgreSQL
            updateScheduleDB();

            return "Success updating CSVs";

        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
            return "Failure updating CSVs";
        }
    }



    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void updateScheduleDB() {
        // Update the schedule table in PostgreSQL

        try {
            Path basePath = Paths.get(System.getProperty("user.dir"));
            Path csvFilePath = basePath.resolve("../DataScraping/ScheduleData/schedule_data.csv").normalize(); // normalize() resolves '..'

            CSVReader reader = new CSVReader(new FileReader(csvFilePath.toFile()));
            jdbcTemplate.execute("TRUNCATE TABLE schedule");

            List<String[]> rows = reader.readAll();

            // Set i=1 so it skips header (first row)
            for (int i=1; i<rows.size(); i++) {
                String[] data = rows.get(i);

                jdbcTemplate.update(
                        "INSERT INTO schedule " +
                                "(date, week_num, status, away_team, away_team_record, home_team, home_team_record, venue, broadcast, season_type, week_id, game_id, away_team_score, home_team_score)" +
                                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], Integer.parseInt(data[9]), Integer.parseInt(data[10]),
                        data[11], Integer.parseInt(data[12]), Integer.parseInt(data[13]));
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
