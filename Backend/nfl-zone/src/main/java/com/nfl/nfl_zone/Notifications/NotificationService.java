package com.nfl.nfl_zone.Notifications;

import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotificationsByUsername(String username) {
        return notificationRepository.findAllByUsername(username);
    }

    public void createNotification(String username, String message) {
        Notification notification = new Notification();

        notification.setNotifId(UUID.randomUUID().toString());
        notification.setCreateDate(new Date()); // today's date
        notification.setDeleteDate(new Date(System.currentTimeMillis() + 864000000)); // set the notification's delete date to 10 days from the date it was created
        notification.setUsername(username);
        notification.setMessage(message);
        notification.setRead(false);

        notificationRepository.save(notification);
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

    public void markNotificationAsRead(String notif_id) {
        Optional<Notification> notificationOptional = notificationRepository.findByNotifId(notif_id);
        if (notificationOptional.isEmpty()) {
            throw new RuntimeException("Notification not found with id: " + notif_id);
        } else {
            Notification notification = notificationOptional.get();
            notification.setRead(true);
            notificationRepository.save(notification);
        }

    }

    public void markAllNotifsAsRead(String username) {
        List<Notification> notifications = notificationRepository.findAllByUsername(username);
        for (Notification notification : notifications) {
            if (!notification.getRead()) {
                notification.setRead(true);
                notificationRepository.save(notification);
            }
        }
    }

}
