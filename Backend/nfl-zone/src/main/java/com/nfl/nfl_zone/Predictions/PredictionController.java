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

    @PutMapping("/setPointsAdded")
    public void markPts(@RequestParam String gameId, @RequestParam String username) {
        predictionService.setPointsAdded(gameId, username);
    }

    @PutMapping("/setWinnerIsCorrect")
    public void setWinnerIsCorrect(@RequestParam String gameId, @RequestParam String username, @RequestParam String isCorrect) {
        predictionService.setWinnerIsCorrect(gameId, username, isCorrect);
    }

    @PutMapping("/setSpreadIsCorrect")
    public void setSpreadIsCorrect(@RequestParam String gameId, @RequestParam String username, @RequestParam String isCorrect) {
        predictionService.setSpreadIsCorrect(gameId, username, isCorrect);
    }

    @PutMapping("/setOverUnderIsCorrect")
    public void setOverUnderIsCorrect(@RequestParam String gameId, @RequestParam String username, @RequestParam String isCorrect) {
        predictionService.setOverUnderIsCorrect(gameId, username, isCorrect);
    }

    @PutMapping("/setNumPoints")
    public void setNumPoints(@RequestParam String gameId, @RequestParam String username, @RequestParam Integer numPoints) {
        predictionService.setNumPoints(gameId, username, numPoints);
    }

}
