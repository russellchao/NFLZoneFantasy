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

    public List<Prediction> getPredictions(String username) {
        return predictionRepository.findAllByUsername(username);
    }

    public void updateMatchupInfo(Prediction incomingPrediction) {
        if (predictionRepository.findByPredictionId(incomingPrediction.getPredictionId()).isEmpty()) {
            // Add the matchup if it doesn't already exist

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
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();

        if (prediction.getPredictedWinner().equals(winner)) {
            prediction.setPredictedWinner("N/A");
        } else {
            prediction.setPredictedWinner(winner);
        }

        predictionRepository.save(prediction);
    }

    public void updateSpreadPrediction(String gameId, String username, String spread) {
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();

        if (prediction.getPredictedSpread().equals(spread)) {
            prediction.setPredictedSpread("N/A");
        } else {
            prediction.setPredictedSpread(spread);
        }

        predictionRepository.save(prediction);
    }

    public void updateOverUnderPrediction(String gameId, String username, String overUnder) {
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();

        if (prediction.getPredictedOverUnder().equals(overUnder)) {
            prediction.setPredictedOverUnder("N/A");
        } else {
            prediction.setPredictedOverUnder(overUnder);
        }

        predictionRepository.save(prediction);
    }

    public void deletePreviousMatchups(String currentWeek) {
        // Delete all predictions that are not for the current week (all predictions from the previous week)

        for (Prediction prediction : predictionRepository.findAll()) {
            if (!prediction.getWeek().equals(currentWeek)) {
                predictionRepository.delete(prediction);
            }
        }
    }

    public void setPointsAdded(String gameId, String username) {
        // Mark the flag that the points for a specific prediction has been added to true
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();
        prediction.setPointsAdded(true);
        predictionRepository.save(prediction);
    }

    public void setWinnerIsCorrect(String gameId, String username, String isCorrect) {
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();
        prediction.setWinnerIsCorrect(isCorrect);
        predictionRepository.save(prediction);
    }

    public void setSpreadIsCorrect(String gameId, String username, String isCorrect) {
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();
        prediction.setSpreadIsCorrect(isCorrect);
        predictionRepository.save(prediction);
    }

    public void setOverUnderIsCorrect(String gameId, String username, String isCorrect) {
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();
        prediction.setOverUnderIsCorrect(isCorrect);
        predictionRepository.save(prediction);
    }

    public void setNumPoints(String gameId, String username, Integer numPoints) {
        Prediction prediction = predictionRepository.findByGameIdAndUsername(gameId, username).get();
        prediction.setNumPoints(numPoints);
        predictionRepository.save(prediction);
    }
}
