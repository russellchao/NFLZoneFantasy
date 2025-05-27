package com.nfl.nfl_zone.PlayerStats.defender;

import com.nfl.nfl_zone.PlayerStats.PlayerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DefenderRepository extends JpaRepository<Defender, PlayerId> {

    void deleteByName(String defenderName);
    Optional<Defender> findByName(String name);
}
