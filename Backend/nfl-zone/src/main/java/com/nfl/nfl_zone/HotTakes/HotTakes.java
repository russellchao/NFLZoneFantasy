package com.nfl.nfl_zone.HotTakes;

import jakarta.persistence.*;

public class HotTakes {

    @Id
    public String username;

    public String hotTake1;
    public String hotTake2;
    public String hotTake3;
    public String hotTake4;
    public String hotTake5;
    public String hotTake6;
    public String hotTake7;
    public String hotTake8;
    public String hotTake9;
    public String hotTake10;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHotTake1() {
        return hotTake1;
    }

    public void setHotTake1(String hotTake1) {
        this.hotTake1 = hotTake1;
    }

    public String getHotTake2() {
        return hotTake2;
    }

    public void setHotTake2(String hotTake2) {
        this.hotTake2 = hotTake2;
    }

    public String getHotTake3() {
        return hotTake3;
    }

    public void setHotTake3(String hotTake3) {
        this.hotTake3 = hotTake3;
    }

    public String getHotTake4() {
        return hotTake4;
    }

    public void setHotTake4(String hotTake4) {
        this.hotTake4 = hotTake4;
    }

    public String getHotTake5() {
        return hotTake5;
    }

    public void setHotTake5(String hotTake5) {
        this.hotTake5 = hotTake5;
    }

    public String getHotTake6() {
        return hotTake6;
    }

    public void setHotTake6(String hotTake6) {
        this.hotTake6 = hotTake6;
    }

    public String getHotTake7() {
        return hotTake7;
    }

    public void setHotTake7(String hotTake7) {
        this.hotTake7 = hotTake7;
    }

    public String getHotTake8() {
        return hotTake8;
    }

    public void setHotTake8(String hotTake8) {
        this.hotTake8 = hotTake8;
    }

    public String getHotTake9() {
        return hotTake9;
    }

    public void setHotTake9(String hotTake9) {
        this.hotTake9 = hotTake9;
    }

    public String getHotTake10() {
        return hotTake10;
    }

    public void setHotTake10(String hotTake10) {
        this.hotTake10 = hotTake10;
    }
}
