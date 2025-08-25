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

    @DeleteMapping("/deleteOld")
    public void deleteOldNotifications(@RequestParam String username) {
        notificationService.deleteOldNotifications(username);
    }

    @PutMapping("/markAsRead")
    public void markAsRead(@RequestParam String notif_id) {
        notificationService.markNotificationAsRead(notif_id);
    }

    @PutMapping("/markAllAsRead")
    public void markAllAsRead(@RequestParam String username) {
        notificationService.markAllNotifsAsRead(username);
    }
}
