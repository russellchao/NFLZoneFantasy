package com.nfl.nfl_zone.Schedule;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="schedule_data")
public class Schedule {

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

    
}
