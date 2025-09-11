export const fetchNotifications = async (username) => {
    console.log(`Getting notifications for user: ${username}`);

    const response = await fetch(
        `${process.env.SPRING_URL}/api/v1/notifications/getByUsername?username=${username}`, {
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

export const createNotification = async (username, message) => {
    console.log(`Creating notification for username ${username}`);

    const response = await fetch(
        `${process.env.SPRING_URL}/api/v1/notifications/create?username=${username}&message=${message}`, {
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

export const deleteNotification = async (notifId) => {
    console.log(`Deleting notification with ID: ${notifId}`);

    const response = await fetch(
        `${process.env.SPRING_URL}/api/v1/notifications/delete?notif_id=${notifId}`, {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error('Failed to delete notification', response.statusText);
    }
};

export const deleteAllNotifications = async (username) => {
    console.log(`Deleting all notifications for user: ${username}`);

    const response = await fetch(
        `${process.env.SPRING_URL}/api/v1/notifications/deleteAll?username=${username}`, {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error('Failed to delete all notifications', response.statusText);
    }
};

export const deleteOldNotifications = async (username) => {
    console.log(`Deleting old notifications for user: ${username}`);

    const response = await fetch(
        `${process.env.SPRING_URL}/api/v1/notifications/deleteOld?username=${username}`, {
            method: "DELETE"
        }
    );
    
    if (!response.ok) {
        throw new Error('Failed to delete notifications', response.statusText);
    };
}