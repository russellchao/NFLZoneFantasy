package com.nfl.nfl_zone.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasserRepository extends JpaRepository<Passer, String> {

    void deleteByName(String passerName);
    Optional<Passer> findByName(String name);
}
