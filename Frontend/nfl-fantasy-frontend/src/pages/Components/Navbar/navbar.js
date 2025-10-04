import React, { useState } from 'react'; 
import {Link, useNavigate} from 'react-router-dom';

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
    const [hoveredLogo, setHoveredLogo] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

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
                
                <Link to="/" style={{ marginRight: "50px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Home"]} 
                        style={logoStyle}
                        alt="Home"
                        onMouseEnter={() => setHoveredLogo("Home")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                    />
                </Link>

                <Link to="/full_schedule" style={{ marginRight: "50px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Schedule"]} 
                        style={logoStyle}
                        alt="Schedule"
                        onMouseEnter={() => setHoveredLogo("Schedule")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                    />
                </Link>

                <Link to="/all_teams" style={{ marginRight: "50px", color: "#ffffff" }}>
                    <img 
                        src={navbarLogos["Teams"]} 
                        style={logoStyle}
                        alt="Teams"
                        onMouseEnter={() => setHoveredLogo("Teams")}
                        onMouseLeave={() => setHoveredLogo(null)}
                        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar; 