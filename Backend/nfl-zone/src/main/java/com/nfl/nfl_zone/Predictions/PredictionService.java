package com.nfl.nfl_zone.Predictions;

import com.nfl.nfl_zone.Auth.UserService;
import com.nfl.nfl_zone.Notifications.NotificationService;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class PredictionService {

    private static HashMap<String, String> getTeamAbbrToName() {
        HashMap<String, String> teamAbbrToName = new HashMap<>();
        teamAbbrToName.put("ARI", "Arizona Cardinals");
        teamAbbrToName.put("ATL", "Atlanta Falcons");
        teamAbbrToName.put("BAL", "Baltimore Ravens");
        teamAbbrToName.put("BUF", "Buffalo Bills");
        teamAbbrToName.put("CAR", "Carolina Panthers");
        teamAbbrToName.put("CHI", "Chicago Bears");
        teamAbbrToName.put("CIN", "Cincinnati Bengals");
        teamAbbrToName.put("CLE", "Cleveland Browns");
        teamAbbrToName.put("DAL", "Dallas Cowboys");
        teamAbbrToName.put("DEN", "Denver Broncos");
        teamAbbrToName.put("DET", "Detroit Lions");
        teamAbbrToName.put("GB", "Green Bay Packers");
        teamAbbrToName.put("HOU", "Houston Texans");
        teamAbbrToName.put("IND", "Indianapolis Colts");
        teamAbbrToName.put("JAX", "Jacksonville Jaguars");
        teamAbbrToName.put("KC", "Kansas City Chiefs");
        teamAbbrToName.put("LV", "Las Vegas Raiders");
        teamAbbrToName.put("LAC", "Los Angeles Chargers");
        teamAbbrToName.put("LAR", "Los Angeles Rams");
        teamAbbrToName.put("MIA", "Miami Dolphins");
        teamAbbrToName.put("MIN", "Minnesota Vikings");
        teamAbbrToName.put("NE", "New England Patriots");
        teamAbbrToName.put("NO", "New Orleans Saints");
        teamAbbrToName.put("NYG", "New York Giants");
        teamAbbrToName.put("NYJ", "New York Jets");
        teamAbbrToName.put("PHI", "Philadelphia Eagles");
        teamAbbrToName.put("PIT", "Pittsburgh Steelers");
        teamAbbrToName.put("SF", "San Francisco 49ers");
        teamAbbrToName.put("SEA", "Seattle Seahawks");
        teamAbbrToName.put("TB", "Tampa Bay Buccaneers");
        teamAbbrToName.put("TEN", "Tennessee Titans");
        teamAbbrToName.put("WSH", "Washington Commanders");
        return teamAbbrToName;
    }

    private final PredictionRepository predictionRepository;
    private final NotificationService notificationService;
    private final UserService userService;

    public PredictionService(PredictionRepository predictionRepository, NotificationService notificationService, UserService userService) {
        this.predictionRepository = predictionRepository;
        this.notificationService = notificationService;
        this.userService = userService;
    }

    public List<Prediction> getPredictions(String username) {
        return predictionRepository.findAllByUsername(username);
    }

    public Boolean checkCorrectWinner(Prediction prediction) {
        if (prediction.getPredictedWinner().equals("N/A")) {
            return null;
        } else if (prediction.getPredictedWinner().equals(prediction.getAwayTeam())) {
            return prediction.getAwayTeamScore() > prediction.getHomeTeamScore();
        } else if (prediction.getPredictedWinner().equals(prediction.getHomeTeam())) {
            return prediction.getAwayTeamScore() < prediction.getHomeTeamScore();
        } else if (prediction.getPredictedWinner().equals("Tie")) {
            return prediction.getAwayTeamScore() == prediction.getHomeTeamScore();
        }
        return null;
    }

    public Boolean checkCorrectSpread(Prediction prediction) {
        HashMap<String, String> teamAbbrToName = getTeamAbbrToName();

        if (prediction.getPredictedSpread().equals("N/A") || prediction.getSpreadValue().equals("N/A") || prediction.getSpreadValue() == null) {
            return null;
        }

        String spreadTeam = prediction.getSpreadValue().replaceAll("-?\\d+(\\.\\d+)?", "").trim(); // E.g. "BUF -3.5" becomes BUF
        float spreadNumber = Float.parseFloat(prediction.getSpreadValue().replaceAll("^[A-Z]{2,3}\\s-?", "")); // Result: -3.5
        String favoredTeam = teamAbbrToName.get(spreadTeam);

        if (prediction.getPredictedSpread().equals("Minus")) {
            if (favoredTeam.equals(prediction.getAwayTeam())) {
                return prediction.getAwayTeamScore() - prediction.getHomeTeamScore() >= spreadNumber;
            } else if (favoredTeam.equals(prediction.getHomeTeam())) {
                return prediction.getHomeTeamScore() - prediction.getAwayTeamScore() >= spreadNumber;
            }
        } else if (prediction.getPredictedSpread().equals("Plus")) {
            if (favoredTeam.equals(prediction.getAwayTeam())) {
                return prediction.getAwayTeamScore() - prediction.getHomeTeamScore() < spreadNumber;
            } else if (favoredTeam.equals(prediction.getHomeTeam())) {
                return prediction.getHomeTeamScore() - prediction.getAwayTeamScore() < spreadNumber;
            }
        }
        return null;
    }

    public Boolean checkCorrectOverUnder(Prediction prediction) {
        if (prediction.getPredictedOverUnder().equals("N/A") || prediction.getPredictedOverUnder() == null) {
            return null;
        } else if (prediction.getPredictedOverUnder().equals("Over")) {
            return prediction.getAwayTeamScore() + prediction.getHomeTeamScore() >= prediction.getOverUnderValue();
        } else if (prediction.getPredictedOverUnder().equals("Under")) {
            return prediction.getAwayTeamScore() + prediction.getHomeTeamScore() < prediction.getOverUnderValue();
        }
        return null;
    }

    public void awardPointsForPrediction(Prediction prediction) {
        int ptsForThisPrediction = 0;

        Boolean winnerIsCorrect = checkCorrectWinner(prediction);
        Boolean spreadIsCorrect = checkCorrectSpread(prediction);
        Boolean overUnderIsCorrect = checkCorrectOverUnder(prediction);

        if (winnerIsCorrect != null) {
            if (winnerIsCorrect) {
                if (prediction.getPredictedWinner().equals("Tie")) {
                    ptsForThisPrediction += 20;
                } else {
                    ptsForThisPrediction++;
                }
                prediction.setWinnerIsCorrect("Yes");
            } else {
                if (prediction.getPredictedWinner().equals("Tie")) {
                    ptsForThisPrediction -= 20;
                } else {
                    ptsForThisPrediction--;
                }
                prediction.setWinnerIsCorrect("No");
            }
        }

        if (spreadIsCorrect != null) {
            if (spreadIsCorrect) {
                ptsForThisPrediction++;
                prediction.setSpreadIsCorrect("Yes");
            } else {
                ptsForThisPrediction--;
                prediction.setSpreadIsCorrect("No");
            }
        }

        if (overUnderIsCorrect != null) {
            if (overUnderIsCorrect) {
                ptsForThisPrediction++;
                prediction.setOverUnderIsCorrect("Yes");
            } else {
                ptsForThisPrediction--;
                prediction.setOverUnderIsCorrect("No");
            }
        }

        prediction.setPointsAdded(true);
        prediction.setNumPoints(ptsForThisPrediction);

        if (ptsForThisPrediction != 0) {
            String notifMessage = String.format(
                    "You %s %d points for your predictions in the %s vs. %s matchup for %s. (Before: %d, After: %d)",
                    ptsForThisPrediction > 0 ? "earned" : "lost",
                    Math.abs(ptsForThisPrediction),
                    prediction.getAwayTeam(),
                    prediction.getHomeTeam(),
                    prediction.getWeek(),
                    userService.getPoints(prediction.getUsername()),
                    userService.getPoints(prediction.getUsername()) + ptsForThisPrediction
            );
            notificationService.createNotification(prediction.getUsername(), notifMessage);
        }

        userService.setPoints(prediction.getUsername(), userService.getPoints(prediction.getUsername()) + ptsForThisPrediction);
        predictionRepository.save(prediction);
    }

    public void updateMatchupInfo(Prediction incomingPrediction) {
        if (predictionRepository.findByPredictionId(incomingPrediction.getPredictionId()).isEmpty()) {
            // Add the matchup if it doesn't already exist
            incomingPrediction.setPredictedWinner("N/A");
            incomingPrediction.setPredictedSpread("N/A");
            incomingPrediction.setPredictedOverUnder("N/A");
            predictionRepository.save(incomingPrediction);
        } else {
            // Update the awayTeamScore, homeTeamScore, spreadValue, overUnderValue, status, date, and start time if it already exists,
            Prediction existingPrediction = predictionRepository.findByGameIdAndUsername(incomingPrediction.getGameId(), incomingPrediction.getUsername()).get();
            existingPrediction.setAwayTeamScore(incomingPrediction.getAwayTeamScore());
            existingPrediction.setHomeTeamScore(incomingPrediction.getHomeTeamScore());
            existingPrediction.setSpreadValue(incomingPrediction.getSpreadValue());
            existingPrediction.setOverUnderValue(incomingPrediction.getOverUnderValue());
            existingPrediction.setStatus(incomingPrediction.getStatus());
            existingPrediction.setDate(incomingPrediction.getDate());
            existingPrediction.setStartTime(incomingPrediction.getStartTime());

            // Add/Subtract to the user's points for the prediction if the matchup status is final, and the points haven't been added yet
            if (existingPrediction.getStatus().equals("Final") && !existingPrediction.isPointsAdded()) {
                awardPointsForPrediction(existingPrediction);
            } else {
                predictionRepository.save(existingPrediction);
            }
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
                // Before deleting, add/subtract to the user's points for the prediction just in case it hasn't been updated yet
                if (prediction.getStatus().equals("Final") && !prediction.isPointsAdded()) {
                    awardPointsForPrediction(prediction);
                }
                predictionRepository.delete(prediction);
            }
        }
    }
}
