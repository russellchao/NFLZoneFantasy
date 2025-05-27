package com.nfl.nfl_zone.PlayerStats;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlayerId implements Serializable {
    private String name;
    private String team;

    // equals() and hashCode() — REQUIRED for composite keys
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayerId)) return false;
        PlayerId that = (PlayerId) o;
        return Objects.equals(name, that.name) && Objects.equals(team, that.team);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, team);
    }
}
