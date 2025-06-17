import React, { createContext, useContext, useState, useEffect } from 'react'; 

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [username, setUsername] = useState('');

    useEffect(() => {
        const status = localStorage.getItem("isLoggedIn") === "true"; 
        const savedUsername = localStorage.getItem("username"); 
        setIsLoggedIn(status); 
        setUsername(savedUsername || ''); 
    }, []);

    const login = (username) => {
        localStorage.setItem("isLoggedIn", "true"); 
        localStorage.setItem("username", username); 
        setIsLoggedIn(true); 
        setUsername(username); 
    };

    const logout = () => {
        localStorage.clear(); 
        setIsLoggedIn(false); 
        setUsername(''); 
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 