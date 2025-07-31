import React, { useState } from 'react'; 
import {Link} from 'react-router-dom';
import { useAuth } from '../../../hooks/use_auth';
import VerifyLogout from '../Logout/verify_logout';

// Import all Navbar logo images
const logoImages = require.context('../../../logos/Navbar Logos', false, /\.(png|jpe?g|svg)$/);

// Create a mapping of team abbreviations to logo paths
const navbarLogos = {};
logoImages.keys().forEach(key => {
    // Remove './' from the start and file extension from the end
    const teamAbbr = key.replace(/^\.\//, '').replace(/\.(png|jpe?g|svg)$/, '');
    navbarLogos[teamAbbr] = logoImages(key);
});

const logoStyle = {
    width: '25px',
    height: '25px',
    marginRight: '35px',
    verticalAlign: 'middle'
};

const buttonStyle = {
    padding: '5px',
    marginLeft: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};


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
            paddingLeft: "25px", 
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
                <Link to="/" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Home"]} 
                        style={logoStyle}
                    />
                </Link>

                <Link to="/full_schedule" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Schedule"]} 
                        style={logoStyle}
                    />
                </Link>

                <Link to="/all_teams" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Teams"]} 
                        style={logoStyle}
                    />
                </Link>

                <Link to="/all_positions" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Positions"]} 
                        style={logoStyle}
                    />
                </Link>

                <Link to="/search" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Player Search"]} 
                        style={logoStyle}
                    />
                </Link>

                {/* Render the confirm logout modal if the user clicks 'Log Out' */}
                {showVerifyLogout && (
                    <VerifyLogout 
                        onConfirm={handleConfirmLogout}
                        onCancel={handleCancelLogout}
                    />
                )}
        
                {/* Conditionally render certain section links based on login status */}
                {isLoggedIn ? (
                    <Link to="/hot_takes" style={{ color: "#ffffff" }}>
                        <img 
                            src={navbarLogos["Hot Takes"]} 
                            style={logoStyle}
                        />
                    </Link>
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
                            style={buttonStyle}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => window.location.href = "/login"}
                            style={buttonStyle}
                        >
                            Login
                        </button>

                        <button 
                            onClick={() => window.location.href = "/register"}
                            style={buttonStyle}
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 