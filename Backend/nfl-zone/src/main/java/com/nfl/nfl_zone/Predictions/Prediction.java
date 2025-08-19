package com.nfl.nfl_zone.Predictions;

import jakarta.persistence.*;

@Entity
@Table(name="prediction")
public class Prediction {

    @Id
    @Column(name = "gameid")
    private String gameId;

    @Column(name = "username")
    private String username;

    @Column(name = "awayteam")
    private String awayTeam;

    @Column(name = "awayteamscore")
    private Integer awayTeamScore;

    @Column(name = "hometeam")
    private String homeTeam;

    @Column(name = "hometeamscore")
    private Integer homeTeamScore;

    @Column(name = "predictedwinner")
    private String predictedWinner;

    @Column(name = "spreadvalue")
    private String spreadValue;

    @Column(name = "predictedspread")
    private String predictedSpread;

    @Column(name = "overundervalue")
    private Double overUnderValue;

    @Column(name = "predictedoverunder")
    private String predictedOverUnder;

    @Column(name = "pointsadded")
    private boolean pointsAdded;

    @Column(name = "week")
    private String week;

    @Column(name = "winneriscorrect")
    private String winnerIsCorrect;

    @Column(name = "spreadiscorrect")
    private String spreadIsCorrect;

    @Column(name = "overunderiscorrect")
    private String overUnderIsCorrect;

    @Column(name = "numpoints")
    private Integer numPoints;


    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(String awayTeam) {
        this.awayTeam = awayTeam;
    }

    public Integer getAwayTeamScore() {
        return awayTeamScore;
    }

    public void setAwayTeamScore(Integer awayTeamScore) {
        this.awayTeamScore = awayTeamScore;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(String homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Integer getHomeTeamScore() {
        return homeTeamScore;
    }

    public void setHomeTeamScore(Integer homeTeamScore) {
        this.homeTeamScore = homeTeamScore;
    }

    public String getPredictedWinner() {
        return predictedWinner;
    }

    public void setPredictedWinner(String predictedWinner) {
        this.predictedWinner = predictedWinner;
    }

    public String getSpreadValue() {
        return spreadValue;
    }

    public void setSpreadValue(String spreadValue) {
        this.spreadValue = spreadValue;
    }

    public String getPredictedSpread() {
        return predictedSpread;
    }

    public void setPredictedSpread(String predictedSpread) {
        this.predictedSpread = predictedSpread;
    }

    public Double getOverUnderValue() {
        return overUnderValue;
    }

    public void setOverUnderValue(Double overUnderValue) {
        this.overUnderValue = overUnderValue;
    }

    public String getPredictedOverUnder() {
        return predictedOverUnder;
    }

    public void setPredictedOverUnder(String predictedOverUnder) {
        this.predictedOverUnder = predictedOverUnder;
    }

    public boolean isPointsAdded() {
        return pointsAdded;
    }

    public void setPointsAdded(boolean pointsAdded) {
        this.pointsAdded = pointsAdded;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getWinnerIsCorrect() {
        return winnerIsCorrect;
    }

    public void setWinnerIsCorrect(String winnerIsCorrect) {
        this.winnerIsCorrect = winnerIsCorrect;
    }

    public String getSpreadIsCorrect() {
        return spreadIsCorrect;
    }

    public void setSpreadIsCorrect(String spreadIsCorrect) {
        this.spreadIsCorrect = spreadIsCorrect;
    }

    public String getOverUnderIsCorrect() {
        return overUnderIsCorrect;
    }

    public void setOverUnderIsCorrect(String overUnderIsCorrect) {
        this.overUnderIsCorrect = overUnderIsCorrect;
    }

    public Integer getNumPoints() {
        return numPoints;
    }

    public void setNumPoints(Integer numPoints) {
        this.numPoints = numPoints;
    }
}
