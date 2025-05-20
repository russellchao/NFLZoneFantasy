package com.nfl.nfl_zone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping(path="api/v1/updateDB")
public class PlayerStatsUpdaterController {
    // This endpoint updates all player stats tables in the PostgreSQL database based on the season requested

    // Functions for when parsing int or double values in the csv, ignores null values
    private Integer parseIntSafe(String s) {
       if (s == null || s.trim().isEmpty()) {
           return null;
       }
       return Integer.parseInt(s.trim());
    }

    private Double parseDoubleSafe(String s) {
        if (s == null || s.trim().isEmpty()) {
            return null;
        }
        return Double.parseDouble(s.trim());
    }


    // Call the Python Flask Endpoint to update the CSV based on the season
    @GetMapping
    public void updateStatsCSVs(@RequestParam() String season) {
        String flaskURL = String.format("http://localhost:5000/playerData/%s", season);
        RestTemplate restTemplate = new RestTemplate();

        try {
            String response = restTemplate.getForObject(flaskURL, String.class);
            System.out.println("Flask Response: " + response);

            // Update the PostgreSQL database for each playing category
            update_database("passing");
//            update_database("rushing");
//            update_database("receiving");
//            update_database("defense");
//            update_database("kicking");


        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
        }
    }


    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void update_database(String playerCategory) {
        try {
            // First, clear the table for each player category (passing, rushing, receiving, defense, kicking)
            Path basePath = Paths.get(System.getProperty("user.dir"));
            Path csvFilePath = basePath.resolve("../DataScraping/PlayerStats/" + playerCategory + "_stats.csv").normalize(); // normalize() resolves '..'
            String tableName = playerCategory + "_stats";

            BufferedReader reader = new BufferedReader(new FileReader(csvFilePath.toFile()));
            jdbcTemplate.execute("TRUNCATE TABLE " + tableName);
            String line;
            reader.readLine(); // Skip header

            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");

//                for (int i = 0; i < data.length; i++) {
//                    System.out.println(data[i]);
//                }

                // Insert the proper data for each playing category from the updated CSV
                if (playerCategory.equals("passing")) {
                    jdbcTemplate.update(
                            "INSERT INTO passing_stats " +
                                    "(name, age, team, pos, gp, cmp, att, cmp_pct, yds, td, int, long, ypg, rate, qbr, sack)" +
                                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            data[0], parseIntSafe(data[1]), data[2], data[3], parseIntSafe(data[4]),
                            parseIntSafe(data[5]), parseIntSafe(data[6]), parseDoubleSafe(data[7]),
                            parseIntSafe(data[8]), parseIntSafe(data[9]), parseIntSafe(data[10]),
                            parseIntSafe(data[11]), parseDoubleSafe(data[12]), parseDoubleSafe(data[13]),
                            parseDoubleSafe(data[14]), parseIntSafe(data[15])
                    );
                }

            }


        } catch (Exception e) {
            e.printStackTrace();
        }


    }



}




















