package com.nfl.nfl_zone.PlayerStats.passer;

import com.nfl.nfl_zone.PlayerStats.PlayerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasserRepository extends JpaRepository<Passer, PlayerId> {

    void deleteByName(String passerName);
    Optional<Passer> findByName(String name);
}
