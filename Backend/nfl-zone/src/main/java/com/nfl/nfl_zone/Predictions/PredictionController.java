package com.nfl.nfl_zone.Predictions;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/predictions")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/updateMatchups")
    public void updateMatchup(@RequestBody Prediction prediction) {
        predictionService.updateMatchupInfo(prediction);
    }

    @DeleteMapping("/deleteOldMatchups")
    public void deleteMatchup(@RequestParam String currentWeek) {
        predictionService.deletePreviousMatchups(currentWeek);
    }

    @GetMapping("/getPredictions")
    public List<Prediction> get(@RequestParam String username) {
        return predictionService.getPredictions(username);
    }

    @PatchMapping("/updatePredictedWinner")
    public void updateWinner(@RequestParam String gameId, @RequestParam String username, @RequestParam String winner) {
        predictionService.updateWinnerPrediction(gameId, username, winner);
    }

    @PatchMapping("/updatePredictedSpread")
    public void updateSpread(@RequestParam String gameId, @RequestParam String username, @RequestParam String spread) {
        predictionService.updateSpreadPrediction(gameId, username, spread);
    }

    @PatchMapping("/updatePredictedOverUnder")
    public void updateOverUnder(@RequestParam String gameId, @RequestParam String username, @RequestParam String overUnder) {
        predictionService.updateOverUnderPrediction(gameId, username, overUnder);
    }

    @PutMapping("/addPoints")
    public void addPts(@RequestParam String gameId, @RequestParam String username, @RequestParam Integer points) {
        predictionService.addPoints(gameId, username, points);
    }
}
