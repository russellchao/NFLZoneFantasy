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
import java.net.URL;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/updateDB")
public class PlayerStatsUpdaterController {
    // This endpoint updates all player stats tables in the PostgreSQL database based on the season requested


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
            update_database("rushing");
            update_database("receiving");
            update_database("defense");
            update_database("kicking");


        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
        }
    }


    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void update_database(String playerCategory) {
        try {
            // First, clear the table for each player category (passing, rushing, receiving, defense, kicking)
            String csvFilePath = "Backend/DataScraping/PlayerStats/" + playerCategory + "_stats.csv";
            String tableName = playerCategory + "_stats";

            BufferedReader reader = new BufferedReader(new FileReader(csvFilePath));
            jdbcTemplate.execute("TRUNCATE TABLE " + tableName);
            String line;
            reader.readLine(); // Skip header

            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");

                // Insert the proper data for each playing category from the updated CSV
                if (playerCategory.equals("passing")) {
                    jdbcTemplate.update(
                            "INSERT INTO passing_stats " +
                                    "(name, age, team, pos, gp, cmp, att, cmp_pct, yds, td, int, long, ypg, rate, qbr, sack)" +
                                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            data[0], Integer.parseInt(data[1]), data[2], data[3], Integer.parseInt(data[4]),
                            Integer.parseInt(data[5]), Integer.parseInt(data[6]), Double.parseDouble(data[7]),
                            Integer.parseInt(data[8]), Integer.parseInt(data[5]), Integer.parseInt(data[10]),
                            Integer.parseInt(data[11]), Double.parseDouble(data[12]), Double.parseDouble(data[13]),
                            Double.parseDouble(data[14]), Integer.parseInt(data[15])
                    );
                }

            }


        } catch (Exception e) {
            e.printStackTrace();
        }


    }



}




















