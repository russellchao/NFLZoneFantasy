// The use_auth hook stores the username for the account the user is logged into

import { useEffect, useState } from "react"; 

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [username, setUsername] = useState(''); 

    useEffect(() => {
        const loggedInTrue = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedInTrue); 

        const name = localStorage.getItem("username"); 
        setUsername(name); 
    }, []); 

    const logout = () => {
        localStorage.clear(); 

        setIsLoggedIn(false); 
        window.location.reload(); 

        console.log(`Logged out successfully`); 
    };

    return { isLoggedIn, username, logout }; 
};