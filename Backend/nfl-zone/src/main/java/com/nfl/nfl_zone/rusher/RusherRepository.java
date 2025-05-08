package com.nfl.nfl_zone.rusher;

import com.nfl.nfl_zone.PlayerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RusherRepository extends JpaRepository<Rusher, PlayerId> {

    void deleteByName(String rusherName);
    Optional<Rusher> findByName(String name);
}
