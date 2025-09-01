package com.nfl.nfl_zone.Notifications;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotificationsByUsername(String username) {
        // reverse so the newer notifications are at the top of the list
        List<Notification> notifList =  notificationRepository.findAllByUsername(username);
        Collections.reverse(notifList);
        return notifList;
    }

    public void createNotification(String username, String message) {
        Notification notification = new Notification();

        notification.setNotifId(UUID.randomUUID().toString());
        notification.setCreateDate(new Date()); // today's date
        notification.setDeleteDate(new Date(System.currentTimeMillis() + 864000000)); // set the notification's delete date to 10 days from the date it was created
        notification.setUsername(username);
        notification.setMessage(message);

        notificationRepository.save(notification);
    }

    public void deleteNotification(String notif_id) {
        Optional<Notification> notificationOptional = notificationRepository.findByNotifId(notif_id);
        if (notificationOptional.isEmpty()) {
            throw new RuntimeException("Notification not found with id: " + notif_id);
        } else {
            notificationRepository.delete(notificationOptional.get());
        }
    }

    public void deleteAllNotifications(String username) {
        List<Notification> notifications = notificationRepository.findAllByUsername(username);
        notificationRepository.deleteAll(notifications);
    }

    public void deleteOldNotifications(String username) {
        // Deletes all notifications that are older than 10 days from the current date (the date they were created)

        Date currentDate = new Date();
        List<Notification> notifications = notificationRepository.findAllByUsername(username);

        for (Notification notification : notifications) {
            if (currentDate.after(notification.getDeleteDate())) {
                notificationRepository.delete(notification);
            }
        }
    }
}
