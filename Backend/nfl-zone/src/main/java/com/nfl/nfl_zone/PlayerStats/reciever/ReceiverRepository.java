package com.nfl.nfl_zone.PlayerStats.reciever;

import com.nfl.nfl_zone.PlayerStats.PlayerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReceiverRepository extends JpaRepository<Receiver, PlayerId> {

    void deleteByName(String receiverName);
    Optional<Receiver> findByName(String name);
}
