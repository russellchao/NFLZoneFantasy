package com.nfl.nfl_zone.Schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, String> {
    void deleteByGameId(String gameId);
    Optional<Schedule> findByGameId(String gameId);
}
