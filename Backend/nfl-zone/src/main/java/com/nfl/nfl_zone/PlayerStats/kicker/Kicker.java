package com.nfl.nfl_zone.PlayerStats.kicker;

import com.nfl.nfl_zone.PlayerStats.PlayerId;
import jakarta.persistence.*;

@Entity
@Table(name="kicking_stats")
@IdClass(PlayerId.class)
public class Kicker {

    @Id
    @Column(name = "name")
    private String name;

    @Id
    @Column(name = "team")
    private String team;

    private Integer age;
    private String pos;
    private Integer gp;
    private Integer fga;
    private Integer fgm;
    private Integer LONG;
    private Integer xpa;
    private Integer xpm;
    private Integer ko;
    private Integer koYds;
    private Integer tb;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public Integer getGp() {
        return gp;
    }

    public void setGp(Integer gp) {
        this.gp = gp;
    }

    public Integer getFga() {
        return fga;
    }

    public void setFga(Integer fga) {
        this.fga = fga;
    }

    public Integer getFgm() {
        return fgm;
    }

    public void setFgm(Integer fgm) {
        this.fgm = fgm;
    }

    public Integer getLONG() {
        return LONG;
    }

    public void setLONG(Integer LONG) {
        this.LONG = LONG;
    }

    public Integer getXpa() {
        return xpa;
    }

    public void setXpa(Integer xpa) {
        this.xpa = xpa;
    }

    public Integer getXpm() {
        return xpm;
    }

    public void setXpm(Integer xpm) {
        this.xpm = xpm;
    }

    public Integer getKo() {
        return ko;
    }

    public void setKo(Integer ko) {
        this.ko = ko;
    }

    public Integer getKoYds() {
        return koYds;
    }

    public void setKoYds(Integer koYds) {
        this.koYds = koYds;
    }

    public Integer getTb() {
        return tb;
    }

    public void setTb(Integer tb) {
        this.tb = tb;
    }
}
