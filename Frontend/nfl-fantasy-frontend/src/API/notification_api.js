export const fetchNotifications = async (username) => {
    console.log(`Getting notifications for user: ${username}`);

    const response = await fetch(
        `http://localhost:8081/api/v1/notifications/getByUsername?username=${username}`, {
            method: "GET"
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch notifications', response.statusText);
    }

    const data = await response.json();
    console.log(data);
    
    return data; 
};

export const deleteOldNotifications = async (username) => {
    console.log(`Deleting old notifications for user: ${username}`);

    const response = await fetch(
        `http://localhost:8081/api/v1/notifications/deleteOld?username=${username}`, {
            method: "DELETE"
        }
    );
    
    if (!response.ok) {
        throw new Error('Failed to delete notifications', response.statusText);
    };
}

export const createNotification = async (username, message) => {
    console.log(`Creating notification for username ${username}`);

    const response = await fetch(
        `http://localhost:8081/api/v1/notifications/create?username=${username}&message=${message}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    if (!response.ok) {
        throw new Error('Failed to create notification:', response.statusText);
    };
}

export const markNotifAsRead = async (notif_id) => {
    console.log(`Marking the notification with ID: ${notif_id} as read`);

    const response = await fetch(
        `http://localhost:8081/api/v1/notifications/markAsRead?notif_id=${notif_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    if (!response.ok) {
        throw new Error('Failed to mark notification as read', response.statusText);
    };
}

export const markAllNotifsAsRead = async (username) => {
    console.log(`Marking all notifications for user ${username} as read`);

    const response = await fetch(
        `http://localhost:8081/api/v1/notifications/markAllAsRead?username=${username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    if (!response.ok) {
        throw new Error('Failed to mark notification as read', response.statusText);
    };
}