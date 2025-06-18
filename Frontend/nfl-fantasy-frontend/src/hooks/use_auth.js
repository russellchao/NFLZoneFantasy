// The use_auth hook stores the username for the account the user is logged into

import { useEffect, useState } from "react"; 

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const status = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(status); 
    }, []); 

    const logout = () => {
        localStorage.removeItem("isLoggedIn"); 
        localStorage.removeItem("username"); 
        setIsLoggedIn(false); 
        window.location.reload(); 

        console.log(`Logged out successfully`); 
    };

    return { isLoggedIn, logout }; 
};