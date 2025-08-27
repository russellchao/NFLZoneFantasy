import React, {useState, useEffect} from 'react';
import { fetchNotifications, deleteNotification, deleteAllNotifications, deleteOldNotifications, markNotifAsRead, markAllNotifsAsRead } from '../../API/notification_api';

const Notifications = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    async function deleteNotif(notifId) {
        await deleteNotification(notifId);

        const notifData = await fetchNotifications(localStorage.getItem("username"));
        setNotifications(notifData); 
    }

    async function deleteAllNotifs() {
        await deleteAllNotifications(localStorage.getItem("username"));

        const notifData = await fetchNotifications(localStorage.getItem("username"));
        setNotifications(notifData); 
    }

    useEffect(() => {
        const getNotifications = async () => {
            // Delete notifications that are older than 10 days old
            await deleteOldNotifications(localStorage.getItem("username")); 

            const notifData = await fetchNotifications(localStorage.getItem("username"));
            setNotifications(notifData); 

            setLoading(false); 
        };
        getNotifications();
    }, [])

    if (loading) {
        return (
            <div style={{ padding: "20px" }}>
                <p>Loading Notifications...</p>
            </div>
        );
    }

    return (
        <>
            <div style={{ padding: "20px" }}>
                <h1>Notifications</h1>
                <h3>Notifications are automatically deleted 10 days after they were created.</h3>

                <br></br>

                {notifications.length > 0 && (
                    <div style={{ display: 'inline-block', paddingLeft: '10px' }}>
                        <button 
                            style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            onClick={() => deleteAllNotifs()}>
                                Delete All Notifications
                        </button>
                    </div>
                )}
                
                <p>&nbsp;</p>

                <div style={{ paddingLeft: '20px' }}>
                    {notifications.length === 0 ? 
                        <h3 style={{ color: 'aqua' }}>No notifications</h3> :
                    notifications.map((notification) => (
                        <p 
                            key={notification.id}
                            style={{ padding: '20px 0', borderBottom: '3px solid #ccc', fontSize: '1.1rem', fontWeight: notification.read ? 'normal' : 'bold' }}
                        >
                            <div style={{ display: 'inline-block', color: 'aqua' }}>
                                • {new Date(notification.createDate).toLocaleString()} ET: 
                            </div>
                            <div style={{ display: 'inline-block', paddingLeft: '10px', color: notification.read ? 'white' : '#7ea2efff' }}>
                                {notification.message}
                            </div>
                            <div style={{ display: 'inline-block', paddingLeft: '20px' }}>
                                <button 
                                    style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
                                    onClick={() => deleteNotif(notification.notifId)}>
                                        Delete
                                </button>
                            </div>
                        </p>
                    ))}
                </div>

                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
        </>  
    );
};

export default Notifications;