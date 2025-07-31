import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../hooks/use_auth';

// Import all logo images
const logoImages = require.context('../../logos/NFL Logos', false, /\.(png|jpe?g|svg)$/);

// Create a mapping of team abbreviations to logo paths
const teamLogos = {};
logoImages.keys().forEach(key => {
    // Remove './' from the start and file extension from the end
    const teamAbbr = key.replace(/^\.\//, '').replace(/\.(png|jpe?g|svg)$/, '');
    teamLogos[teamAbbr] = logoImages(key);
});

const heroStyle = {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #409398ff 0%, #296b88ff 100%)',
    color: '#fff',
    borderRadius: '18px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    margin: '40px auto',
    width: '80%',
    maxWidth: '700px',
    padding: '40px 20px'
};

const logoStyle = {
    width: '160px',
    height: '160px',
    marginBottom: '24px',
    borderRadius: '50%',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    background: '#fff'
};

const titleStyle = {
    fontSize: '2.8rem',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '12px',
    textShadow: '0 2px 8px rgba(0,0,0,0.18)'
};

const subtitleStyle = {
    fontSize: '1.3rem',
    fontWeight: '400',
    marginBottom: '24px',
    color: '#e0e0e0'
};

const buttonStyle = {
    padding: '12px 32px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: '#0e3739ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.2s'
};

const gridStyle = {
    display: 'grid', 
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    padding: '20px',
}

const Home = () => {
    const { isLoggedIn, username } = useAuth(); 
    const navigate = useNavigate();

    return (
        <div style={heroStyle}>
            <img 
                src={teamLogos["NFL"]} 
                style={logoStyle}
                alt="NFL Logo"
            />
            <h1 style={titleStyle}>NFL Zone</h1>
            <h3 style={subtitleStyle}>A hub for American Football enthusiasts</h3>
            <div style={gridStyle}>
                <button style={buttonStyle} onClick={() => navigate("/full_schedule")}>
                    Schedule
                </button>
                <button style={buttonStyle} onClick={() => navigate("/all_teams")}>
                    Teams
                </button>
                <button style={buttonStyle} onClick={() => navigate("/all_positions")}>
                    Positions
                </button>
                <button style={buttonStyle} onClick={() => navigate("/search")}>
                    Player Search
                </button>
            </div>

            <h3 style={subtitleStyle}>Below features for logged in users only</h3>

            <div style={gridStyle}>
                <button style={buttonStyle} onClick={() => isLoggedIn ? navigate("/hot_takes") : navigate("/login")}>
                    Hot Takes
                </button>
            </div>
            
        </div>
    );
};

export default Home; 