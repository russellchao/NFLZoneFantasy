package com.nfl.nfl_zone.PlayerStats.defender;

import com.nfl.nfl_zone.PlayerStats.PlayerId;
import jakarta.persistence.*;

@Entity
@Table(name="defense_stats")
@IdClass(PlayerId.class)
public class Defender {

    @Id
    @Column(name = "name")
    private String name;

    @Id
    @Column(name = "team")
    private String team;

    private Integer age;
    private String pos;
    private Integer gp;
    private Integer tck;
    private Integer solo;
    private Integer asst;
    private Integer tfl;
    private Float sack;
    private Integer pbu;
    private Integer INT;
    private Integer inttd;
    private Integer ff;
    private Integer fr;
    private Integer frtd;

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

    public Integer getTck() {
        return tck;
    }

    public void setTck(Integer tck) {
        this.tck = tck;
    }

    public Integer getSolo() {
        return solo;
    }

    public void setSolo(Integer solo) {
        this.solo = solo;
    }

    public Integer getAsst() {
        return asst;
    }

    public void setAsst(Integer asst) {
        this.asst = asst;
    }

    public Integer getTfl() {
        return tfl;
    }

    public void setTfl(Integer tfl) {
        this.tfl = tfl;
    }

    public Float getSack() {
        return sack;
    }

    public void setSack(Float sack) {
        this.sack = sack;
    }

    public Integer getPbu() {
        return pbu;
    }

    public void setPbu(Integer pbu) {
        this.pbu = pbu;
    }

    public Integer getINT() {
        return INT;
    }

    public void setINT(Integer INT) {
        this.INT = INT;
    }

    public Integer getIntTD() { return inttd; }

    public void setIntTD(Integer inttd) { this.inttd = inttd; }

    public Integer getFf() {
        return ff;
    }

    public void setFf(Integer ff) {
        this.ff = ff;
    }

    public Integer getFr() {
        return fr;
    }

    public void setFr(Integer fr) {
        this.fr = fr;
    }

    public Integer getFrtd() {
        return frtd;
    }

    public void setFrtd(Integer frtd) {
        this.frtd = frtd;
    }
}
