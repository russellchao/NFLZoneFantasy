package com.nfl.nfl_zone.Notifications;

import java.util.*;
import jakarta.persistence.*;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @Column(name = "notif_id")
    private String notifId;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "delete_date")
    private Date DeleteDate;

    @Column(name = "username")
    private String username;

    @Column(name = "message")
    private String message;


    public String getNotifId() {
        return notifId;
    }

    public void setNotifId(String notifId) {
        this.notifId = notifId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getDeleteDate() {
        return DeleteDate;
    }

    public void setDeleteDate(Date DeleteDate) {
        this.DeleteDate = DeleteDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
