package com.nfl.nfl_zone.Predictions;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class PredictionService {

    private final PredictionRepository predictionRepository;

    public PredictionService(PredictionRepository predictionRepository) {
        this.predictionRepository = predictionRepository;
    }

    public void updateMatchupInfo(Prediction incomingPrediction) {
        if (predictionRepository.findByGameIdAndUsername(incomingPrediction.getGameId(), incomingPrediction.getUsername()).isEmpty()) {
            // Add the matchup if it doesn't already exist (based on gameId and username)

            incomingPrediction.setPredictedWinner("N/A");
            incomingPrediction.setPredictedSpread("N/A");
            incomingPrediction.setPredictedOverUnder("N/A");

            predictionRepository.save(incomingPrediction);

        } else {
            // Update the awayTeamScore, homeTeamScore, spreadValue, and overUnderValue if it already exists

            Prediction existingPrediction = predictionRepository.findByGameIdAndUsername(incomingPrediction.getGameId(), incomingPrediction.getUsername()).get();
            existingPrediction.setAwayTeamScore(incomingPrediction.getAwayTeamScore());
            existingPrediction.setHomeTeamScore(incomingPrediction.getHomeTeamScore());
            existingPrediction.setSpreadValue(incomingPrediction.getSpreadValue());
            existingPrediction.setOverUnderValue(incomingPrediction.getOverUnderValue());

            predictionRepository.save(existingPrediction);
        }
    }


    public void updateWinnerPrediction(String gameId, String username, String winner) {

    }


    public void updateSpreadPrediction(String gameId, String username, String spread) {

    }


    public void updateOverUnderPrediction(String gameId, String username, String overUnder) {

    }


    public void deletePreviousMatchups(String currentWeek) {
        // Delete all predictions that are not for the current week (all predictions from the previous week)

        for (Prediction prediction : predictionRepository.findAll()) {
            if (!prediction.getWeek().equals(currentWeek)) {
                predictionRepository.delete(prediction);
            }
        }
    }
}
