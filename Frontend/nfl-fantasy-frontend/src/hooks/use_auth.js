// The use_auth hook stores the username for the account the user is logged into

import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import VerifyLogout from "../pages/Components/Logout/verify_logout";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [username, setUsername] = useState(''); 
    // const navigate = useNavigate(); 

    useEffect(() => {
        const loggedInTrue = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedInTrue); 

        const name = localStorage.getItem("username"); 
        setUsername(name); 
    }, []); 

    return { isLoggedIn, username, }; 
};