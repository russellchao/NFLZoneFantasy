package com.nfl.nfl_zone.HotTakes;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "hot_takes")
public class HotTakes {

    @Id
    private String username;
    private List<String> hotTakes;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getHotTakes() {
        return hotTakes;
    }

    public void setHotTakes(List<String> hotTakes) {
        this.hotTakes = hotTakes;
    }
}
