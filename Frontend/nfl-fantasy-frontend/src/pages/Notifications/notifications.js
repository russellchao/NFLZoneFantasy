import React, {useState, useEffect} from 'react';
import { fetchNotifications, deleteOldNotifications } from '../../API/notification_api';

const Notifications = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await deleteOldNotifications(localStorage.getItem("username")); 

            const notifData = await fetchNotifications(localStorage.getItem("username"));
            setNotifications(notifData); 

            setLoading(false); 
        })();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ padding: "20px" }}>
                <h1>Notifications</h1>
                <h3>Notifications are automatically deleted 10 days after they were created.</h3>
                <br></br>
                <div style={{ paddingLeft: '20px' }}>
                    {notifications.length === 0 ? 
                        <h3 style={{ color: 'aqua' }}>No notifications</h3> :
                    notifications.map((notification) => (
                        <h4>
                            <div style={{ display: 'inline-block', color: 'aqua' }}>
                                • {new Date(notification.createDate).toLocaleString()} ET: 
                            </div>
                            <div style={{ display: 'inline-block', paddingLeft: '10px', color: '#7ea2efff' }}>
                                {notification.message}
                            </div>
                        </h4>
                    ))}
                </div>
            </div>
        </>  
    );
};

export default Notifications;