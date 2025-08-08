package com.nfl.nfl_zone.Predictions;

import org.springframework.web.bind.annotation.*;

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
}
