package com.nfl.nfl_zone.Schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;

public class UpdateSchedule {

    public String updateScheduleCSVs(String year, String week, String seasonType) {
        // Call the Python Flask Endpoint to Update the CSV file containing the matchups from the given week, year, and season type

        String flaskURL = String.format("http://localhost:5000/scheduleData/%s/%s/%s", year, week, seasonType);
        RestTemplate restTemplate = new RestTemplate();

        try {
            String response = restTemplate.getForObject(flaskURL, String.class);
            System.out.println("Flask Response: " + response);

            // When the user tries to retrieve player stats from a season that's not available
            if (response.equals("Failure updating schedule data")) {
                return "Failure updating CSVs";
            }

            System.out.println("Success");
            return "Success updating CSVs";


        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
            return "Failure updating CSVs";
        }
    }




    private JdbcTemplate jdbcTemplate;

    public void updateScheduleDB() {
        // Update the schedule table in PostgreSQL

        try {
            Path basePath = Paths.get(System.getProperty("user.dir"));
            Path csvFilePath = basePath.resolve("../DataScraping/ScheduleData/schedule_data.csv").normalize(); // normalize() resolves '..'
            String tableName = "schedule";

            BufferedReader reader = new BufferedReader(new FileReader(csvFilePath.toFile()));
            jdbcTemplate.execute("TRUNCATE TABLE " + tableName);
            String line;
            reader.readLine();

            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");

                jdbcTemplate.update(
                        "INSERT INTO rushing_stats " +
                                "(date, week_num, status, away_team, away_team_record, home_team, home_team_record, venue, broadcast, season_type, week_id, game_id)" +
                                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        data[0], data[1], data[2], data[3],data[4], data[5], data[6], data[7], data[8], Integer.parseInt(data[9]), Integer.parseInt(data[10]), data[11]);
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }





























}
