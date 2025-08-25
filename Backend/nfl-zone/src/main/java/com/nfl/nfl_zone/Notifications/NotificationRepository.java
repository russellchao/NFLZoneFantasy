package com.nfl.nfl_zone.Notifications;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findAllByUsername(String username);
    Optional<Notification> findByNotifId(String notif_id);
}
