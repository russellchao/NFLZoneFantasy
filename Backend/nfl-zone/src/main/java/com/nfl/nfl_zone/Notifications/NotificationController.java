package com.nfl.nfl_zone.Notifications;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/getByUsername")
    public List<Notification> getNotifications(@RequestParam String username) {
        return notificationService.getNotificationsByUsername(username);
    }

    @PostMapping("/create")
    public void createNotification(@RequestParam String username, @RequestParam String message) {
        notificationService.createNotification(username, message);
    }

    @DeleteMapping("/delete")
    public void deleteNotification(@RequestParam String notif_id) {
        notificationService.deleteNotification(notif_id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllNotifications(@RequestParam String username) {
        notificationService.deleteAllNotifications(username);
    }

    @DeleteMapping("/deleteOld")
    public void deleteOldNotifications(@RequestParam String username) {
        notificationService.deleteOldNotifications(username);
    }
}
