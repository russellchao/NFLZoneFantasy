// The use_auth hook stores the username for the account the user is logged into

import { useEffect, useState } from "react"; 

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [username, setUsername] = useState(''); 
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const loggedInTrue = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedInTrue); 

        const name = localStorage.getItem("username"); 
        setUsername(name); 

        const points = localStorage.getItem("points");
        setPoints(points ? parseInt(points, 10) : 0); // Ensure points is a number

        // Listen for point updates
        const handlePointsUpdate = () => {
            const updatedPoints = localStorage.getItem("points");
            setPoints(updatedPoints ? parseInt(updatedPoints, 10) : 0);
        };
        window.addEventListener("pointsUpdated", handlePointsUpdate);

        return () => {
            window.removeEventListener("pointsUpdated", handlePointsUpdate);
        };
    }, []); 

    return { isLoggedIn, username, points }; 
};