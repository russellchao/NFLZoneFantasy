package com.nfl.nfl_zone.HotTakes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface HotTakeRepository extends JpaRepository<HotTakes, String> {
    Optional<HotTakes> findByUsername(String username);
}
