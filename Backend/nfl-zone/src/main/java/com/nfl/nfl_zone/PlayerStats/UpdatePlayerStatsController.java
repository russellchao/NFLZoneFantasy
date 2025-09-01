package com.nfl.nfl_zone.PlayerStats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.scheduling.annotation.Async;

import com.opencsv.CSVReader;
import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.CompletableFuture;


@RestController
@RequestMapping(path="api/v1/updatePlayerStats")
public class UpdatePlayerStatsController {
    // This endpoint updates all player stats tables in the PostgreSQL database based on the season requested

    @Autowired
    private JdbcTemplate jdbcTemplate;

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


    @GetMapping
    public String updateStatsCSVs(@RequestParam() String season) {
        // Call the Python Flask Endpoint to update the CSV based on the season

        String flaskURL = String.format("http://flask-app:5000/playerData/%s", season);
        RestTemplate restTemplate = new RestTemplate();

        try {
            String response = restTemplate.getForObject(flaskURL, String.class);
            System.out.println("Flask Response: " + response);

            // When the user tries to retrieve player stats from a season that's not available
            if (response.equals("Failure updating player stats data")) {
                return "Failure updating CSVs";
            }

            /* Update the databases for each player category asynchronously. */

            // Create a list of futures for all database updates
            List<CompletableFuture<Void>> futures = List.of(
                update_database_async("passing"),
                update_database_async("rushing"),
                update_database_async("receiving"),
                update_database_async("defense"),
                update_database_async("kicking")
            );

            // Wait for all futures to complete
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

            System.out.println("Success");
            return "Success updating CSVs";

        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
            return "Failure updating CSVs";
        }
    }


    @Async
    public CompletableFuture<Void> update_database_async(String playerCategory) {
        update_database(playerCategory);
        return CompletableFuture.completedFuture(null);
    }


    public void update_database(String playerCategory) {
        try {
            // First, clear the table for each player category (passing, rushing, receiving, defense, kicking)
            Path basePath = Paths.get(System.getProperty("user.dir"));
            Path csvFilePath = basePath.resolve("../FlaskApp/PlayerStatsData/" + playerCategory + "_stats.csv").normalize(); // normalize() resolves '..'
            String tableName = playerCategory + "_stats";

            CSVReader reader = new CSVReader(new FileReader(csvFilePath.toFile()));
            jdbcTemplate.execute("TRUNCATE TABLE " + tableName);

            List<String[]> rows = reader.readAll();

            // Set i=1 so it skips header (first row)
            for (int i=1; i<rows.size(); i++) {
                String[] data = rows.get(i);

                // Insert the proper data for each playing category from the updated CSV
                if (playerCategory.equals("passing")) {
                    jdbcTemplate.update(
                            "INSERT INTO passing_stats " +
                                    "(name, age, team, pos, gp, cmp, att, cmp_pct, yds, td, int, long, ypg, rate, qbr, sack)" +
                                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            data[0], parseIntSafe(data[1]), data[2], data[3], parseIntSafe(data[4]), parseIntSafe(data[5]), parseIntSafe(data[6]),
                            parseDoubleSafe(data[7]), parseIntSafe(data[8]), parseIntSafe(data[9]), parseIntSafe(data[10]), parseIntSafe(data[11]),
                            parseDoubleSafe(data[12]), parseDoubleSafe(data[13]), parseDoubleSafe(data[14]), parseIntSafe(data[15])
                    );

                } else if (playerCategory.equals("rushing")) {
                    jdbcTemplate.update(
                            "INSERT INTO rushing_stats " +
                                    "(name, age, team, pos, gp, att, yds, td, long, ypg, fmb)" +
                                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            data[0], parseIntSafe(data[1]), data[2], data[3], parseIntSafe(data[4]), parseIntSafe(data[5]), parseIntSafe(data[6]),
                            parseIntSafe(data[7]), parseIntSafe(data[8]), parseDoubleSafe(data[9]), parseIntSafe(data[10])
                    );

                } else if (playerCategory.equals("receiving")) {
                    jdbcTemplate.update(
                            "INSERT INTO receiving_stats " +
                                    "(name, age, team, pos, gp, rec, yds, td, long, ypg, fmb)" +
                                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            data[0], parseIntSafe(data[1]), data[2], data[3], parseIntSafe(data[4]), parseIntSafe(data[5]), parseIntSafe(data[6]),
                            parseIntSafe(data[7]), parseIntSafe(data[8]), parseDoubleSafe(data[9]), parseIntSafe(data[10])
                    );

                } else if (playerCategory.equals("defense")) {
                    jdbcTemplate.update(
                            "INSERT INTO defense_stats " +
                                    "(name, age, team, pos, gp, tck, solo, asst, tfl, sack, pbu, int, inttd, ff, fr, frtd)" +
                                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            data[0], parseIntSafe(data[1]), data[2], data[3], parseIntSafe(data[4]), parseIntSafe(data[5]), parseIntSafe(data[6]),
                            parseIntSafe(data[7]), parseIntSafe(data[8]), parseDoubleSafe(data[9]), parseIntSafe(data[10]), parseIntSafe(data[11]),
                            parseIntSafe(data[12]), parseIntSafe(data[13]), parseIntSafe(data[14]), parseIntSafe(data[15])
                    );

                } else if (playerCategory.equals("kicking")) {
                    jdbcTemplate.update(
                            "INSERT INTO kicking_stats " +
                                    "(name, age, team, pos, gp, fga, fgm, long, xpa, xpm, ko, ko_yds, tb)" +
                                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            data[0], parseIntSafe(data[1]), data[2], data[3], parseIntSafe(data[4]), parseIntSafe(data[5]), parseIntSafe(data[6]),
                            parseIntSafe(data[7]), parseIntSafe(data[8]), parseIntSafe(data[9]), parseIntSafe(data[10]), parseIntSafe(data[11]),
                            parseIntSafe(data[12])
                    );
                }

            }


        } catch (Exception e) {
            e.printStackTrace();
        }


    }



}




















