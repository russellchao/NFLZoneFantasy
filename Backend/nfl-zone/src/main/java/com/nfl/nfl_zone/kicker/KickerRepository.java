package com.nfl.nfl_zone.kicker;

import com.nfl.nfl_zone.PlayerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KickerRepository extends JpaRepository<Kicker, PlayerId> {

    void deleteByName(String kickerName);
    Optional<Kicker> findByName(String name);
}
