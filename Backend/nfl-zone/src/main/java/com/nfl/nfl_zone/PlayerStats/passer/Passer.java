package com.nfl.nfl_zone.PlayerStats.passer;

import jakarta.persistence.*;
import com.nfl.nfl_zone.PlayerStats.PlayerId;

@Entity
@Table(name="passing_stats")
@IdClass(PlayerId.class)
public class Passer {

    @Id
    @Column(name = "name")
    private String name;

    @Id
    @Column(name = "team")
    private String team;

    private Integer age;
    private String pos;
    private Integer gp;
    private Integer cmp;
    private Integer att;
    private Float cmp_pct;
    private Integer yds;
    private Integer td;
    private Integer INT;
    private Integer LONG;
    private Float ypg;
    private Float rate;
    private Float qbr;
    private Integer sack;

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

    public Integer getCmp() {
        return cmp;
    }

    public void setCmp(Integer cmp) {
        this.cmp = cmp;
    }

    public Integer getAtt() {
        return att;
    }

    public void setAtt(Integer att) {
        this.att = att;
    }

    public Float getCmpPct() {
        return cmp_pct;
    }

    public void setCmpPct(Float cmp_pct) {
        this.cmp_pct = cmp_pct;
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

    public Integer getINT() {
        return INT;
    }

    public void setINT(Integer INT) {
        this.INT = INT;
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

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public Float getQbr() {
        return qbr;
    }

    public void setQbr(Float qbr) {
        this.qbr = qbr;
    }

    public Integer getSack() {
        return sack;
    }

    public void setSack(Integer sack) {
        this.sack = sack;
    }
}
