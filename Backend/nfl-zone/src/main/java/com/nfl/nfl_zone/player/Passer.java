package com.nfl.nfl_zone.player;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="passing_stats")
public class Passer extends Player {

    private Integer cmp;
    private Integer att;
    private Float cmpPct;
    private Integer yds;
    private Integer td;
    private Integer INT;
    private Integer LONG;
    private Float ypg;
    private Float rate;
    private Float qbr;
    private Integer sack;


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
        return cmpPct;
    }

    public void setCmpPct(Float cmpPct) {
        this.cmpPct = cmpPct;
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
