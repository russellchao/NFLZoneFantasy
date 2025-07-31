import React, { useState } from 'react'; 
import {Link} from 'react-router-dom';
import { useAuth } from '../../../hooks/use_auth';
import VerifyLogout from '../Logout/verify_logout';

const Navbar = () => {
    const { isLoggedIn, username } = useAuth(); 
    const [showVerifyLogout, setShowVerifyLogout] = useState(false);

    // If the user clicks 'Log Out', show the logout confirmation modal
    const handleLogoutClick = () => setShowVerifyLogout(true);

    // If the user clicks 'No' when being asked to Log out
    const handleCancelLogout = () => setShowVerifyLogout(false);

    // If the user clicks 'Yes' when being asked to Log out, clear auth info and redirect to home page
    const handleConfirmLogout = () => {
        localStorage.clear();
        window.location.href = "/";
        console.log("Logged out successfully");
    };

    return (
        <nav style={{ 
            padding: "20px", 
            background: "#004d26",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ marginRight: "30px", color: "#ffffff" }}>Home</Link>
            <Link to="/full_schedule" style={{ marginRight: "30px", color: "#ffffff" }}>Schedule</Link>
            <Link to="/all_teams" style={{ marginRight: "30px", color: "#ffffff" }}>Teams</Link>
            <Link to="/all_positions" style={{ marginRight: "30px", color: "#ffffff" }}>Positions</Link>
            <Link to="/search" style={{ marginRight: "30px", color: "#ffffff" }}>Player Search</Link>

            {/* Render the confirm logout modal if the user clicks 'Log Out' */}
            {showVerifyLogout && (
                <VerifyLogout 
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                />
            )}
    
            {/* Conditionally render certain section links based on login status */}
            {isLoggedIn ? (
                <Link to="/hot_takes" style={{ color: "#ffffff" }}>Hot Takes</Link>
            ) : (
                null
            )}
            </div>
    
            {/* Login section */}
            <div style={{ marginLeft: "auto", marginRight: "50px" }}>
            {isLoggedIn ? (
                <>
                <span style={{ color: "#ffffff" }}>Welcome, {username}!</span>
                <button 
                    onClick={handleLogoutClick}
                    style={{
                    padding: '5px',
                    marginLeft: '15px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                    }}
                >
                    Log Out
                </button>
                </>
            ) : (
                <>
                <Link to="/login" style={{ color: "#ffffff", marginRight: "15px" }}>Log In</Link>
                <Link to="/register" style={{ color: "#ffffff" }}>Register</Link>
                </>
            )}
            </div>
        </nav>
    );
};

export default Navbar; 