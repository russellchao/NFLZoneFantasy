import React, { useState } from 'react'; 
import {Link, useNavigate} from 'react-router-dom';
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
    const { isLoggedIn, username, points } = useAuth(); 
    const [showVerifyLogout, setShowVerifyLogout] = useState(false);
    const [hoveredLogo, setHoveredLogo] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    // If the user clicks 'Log Out', show the logout confirmation modal
    const handleLogoutClick = () => setShowVerifyLogout(true);

    // If the user clicks 'No' when being asked to Log out
    const handleCancelLogout = () => setShowVerifyLogout(false);

    // If the user clicks 'Yes' when being asked to Log out, clear auth info and redirect to home page
    const handleConfirmLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload(); // reload the page to reflect the logout state
        console.log("Logged out successfully");
    };

    return (
        <nav style={{ 
            padding: "20px",
            paddingLeft: "25px", 
            background: "#10161eff",
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
                {/* Banner for hovered logo */}
                {hoveredLogo && (
                    <div 
                        style={{
                            position: "absolute",
                            top: mousePos.y + 20, // 20px below the cursor
                            left: mousePos.x,
                            background: "#222",
                            color: "#fff",
                            padding: "6px 18px",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            zIndex: 2000,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            pointerEvents: "none"
                        }}
                    >
                        {hoveredLogo}
                    </div>
                )}
                
                <Link to="/" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Home"]} 
                        style={logoStyle}
                        alt="Home"
                        onMouseEnter={() => setHoveredLogo("Home")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                    />
                </Link>

                <Link to="/full_schedule" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Schedule"]} 
                        style={logoStyle}
                        alt="Schedule"
                        onMouseEnter={() => setHoveredLogo("Schedule")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                    />
                </Link>

                <Link to="/all_teams" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Teams"]} 
                        style={logoStyle}
                        alt="Teams"
                        onMouseEnter={() => setHoveredLogo("Teams")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                    />
                </Link>

                <Link to="/all_positions" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Positions"]} 
                        style={logoStyle}
                        alt="Positions"
                        onMouseEnter={() => setHoveredLogo("Positions")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                    />
                </Link>

                <Link to="/search" style={{ marginRight: "30px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Player Search"]} 
                        style={logoStyle}
                        alt="Player Search"
                        onMouseEnter={() => setHoveredLogo("Player Search")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
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
                    <div>
                        <Link to="/hot_takes" style={{ marginRight: "30px", color: "#ffffff" }}>
                            <img 
                                src={navbarLogos["Hot Takes"]} 
                                style={logoStyle}
                                alt="Hot Takes"
                                onMouseEnter={() => setHoveredLogo("Hot Takes")}
                                onMouseLeave={() => setHoveredLogo(null)}
                                onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                            />
                        </Link>

                        <Link to="/predict_the_winner" style={{ marginRight: "30px", color: "#ffffff" }}>
                            <img 
                                src={navbarLogos["Predict The Winner"]} 
                                style={logoStyle}
                                alt="Predict The Winner"
                                onMouseEnter={() => setHoveredLogo("Predict The Winner")}
                                onMouseLeave={() => setHoveredLogo(null)}
                                onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                            />
                        </Link>
                    </div>
                ) : (
                    null
                )}
                </div>
        
                {/* Login section */}
                <div style={{ marginLeft: "auto", marginRight: "50px" }}>
                    {isLoggedIn ? (
                        <>
                        <span style={{ color: "#d2e859ff" }}>Points: {points}</span>
                        <span style={{ color: "#ffffff", paddingLeft: "30px" }}>Welcome, {username}!</span>
                        <div style={{ display: "inline-block" }}>
                            <button 
                                onClick={handleLogoutClick}
                                style={buttonStyle}
                            >
                                Log Out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => navigate('/login')}
                            style={buttonStyle}
                        >
                            Login
                        </button>

                        <button 
                            onClick={() => navigate('/register')}
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