package com.nfl.nfl_zone.Schedule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="schedule")
public class Game {

    private String date;
    private String weekNum;
    private String status;
    private String awayTeam;
    private String awayTeamRecord;
    private String homeTeam;
    private String homeTeamRecord;
    private String venue;
    private String broadcast;
    private Integer seasonType;
    private Integer weekId;

    @Id
    @Column(name = "game_id")
    private String gameId;

    private Integer awayTeamScore;
    private Integer homeTeamScore;


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getWeekNum() {
        return weekNum;
    }

    public void setWeekNum(String weekNum) {
        this.weekNum = weekNum;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(String awayTeam) {
        this.awayTeam = awayTeam;
    }

    public String getAwayTeamRecord() {
        return awayTeamRecord;
    }

    public void setAwayTeamRecord(String awayTeamRecord) {
        this.awayTeamRecord = awayTeamRecord;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(String homeTeam) {
        this.homeTeam = homeTeam;
    }

    public String getHomeTeamRecord() {
        return homeTeamRecord;
    }

    public void setHomeTeamRecord(String homeTeamRecord) {
        this.homeTeamRecord = homeTeamRecord;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getBroadcast() {
        return broadcast;
    }

    public void setBroadcast(String broadcast) {
        this.broadcast = broadcast;
    }

    public Integer getSeasonType() {
        return seasonType;
    }

    public void setSeasonType(Integer seasonType) {
        this.seasonType = seasonType;
    }

    public Integer getWeekId() {
        return weekId;
    }

    public void setWeekId(Integer weekId) {
        this.weekId = weekId;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public Integer getAwayTeamScore() {
        return awayTeamScore;
    }

    public void setAwayTeamScore(Integer awayTeamScore) {
        this.awayTeamScore = awayTeamScore;
    }

    public Integer getHomeTeamScore() {
        return homeTeamScore;
    }

    public void setHomeTeamScore(Integer homeTeamScore) {
        this.homeTeamScore = homeTeamScore;
    }
}
