package com.nfl.nfl_zone.PlayerStats.reciever;

import com.nfl.nfl_zone.PlayerStats.PlayerId;
import jakarta.persistence.*;

@Entity
@Table(name="receiving_stats")
@IdClass(PlayerId.class)
public class Receiver {

    @Id
    @Column(name = "name")
    private String name;

    @Id
    @Column(name = "team")
    private String team;

    private Integer age;
    private String pos;
    private Integer gp;
    private Integer rec;
    private Integer yds;
    private Integer td;
    private Integer LONG;
    private Float ypg;
    private Integer fmb;

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

    public Integer getRec() {
        return rec;
    }

    public void setRec(Integer rec) {
        this.rec = rec;
    }

    public Integer getYds() {
        return yds;
    }

    public void setYds(Integer yds) {
        this.yds = yds;
    }

    public Integer getTd() {
        return td;
    }

    public void setTd(Integer td) {
        this.td = td;
    }

    public Integer getLONG() {
        return LONG;
    }

    public void setLONG(Integer LONG) {
        this.LONG = LONG;
    }

    public Float getYpg() {
        return ypg;
    }

    public void setYpg(Float ypg) {
        this.ypg = ypg;
    }

    public Integer getFmb() {
        return fmb;
    }

    public void setFmb(Integer fmb) {
        this.fmb = fmb;
    }
}
