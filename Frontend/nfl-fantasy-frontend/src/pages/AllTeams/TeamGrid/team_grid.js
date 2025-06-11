import React, { use } from 'react'; 
import { useNavigate } from 'react-router-dom';

// Import all logo images
const logoImages = require.context('../../../logos', false, /\.(png|jpe?g|svg)$/);

// Create a mapping of team abbreviations to logo paths
const teamLogos = {};
logoImages.keys().forEach(key => {
    // Remove './' from the start and file extension from the end
    const teamAbbr = key.replace(/^\.\//, '').replace(/\.(png|jpe?g|svg)$/, '');
    teamLogos[teamAbbr] = logoImages(key);
});

const afcEast = [
    "Buffalo Bills", "Miami Dolphins", "New England Patriots", "New York Jets"
]; 

const afcNorth = [
    "Baltimore Ravens", "Cincinnati Bengals", "Cleveland Browns", "Pittsburgh Steelers"
]; 

const afcSouth = [
    "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Tennessee Titans"
]; 

const afcWest = [
    "Denver Broncos", "Kansas City Chiefs", "Las Vegas Raiders", "Los Angeles Chargers"
]; 

const nfcEast = [
    "Dallas Cowboys", "New York Giants", "Philadelphia Eagles", "Washington Commanders"
]; 

const nfcNorth = [
    "Chicago Bears", "Detroit Lions", "Green Bay Packers", "Minnesota Vikings",
]; 

const nfcSouth = [
    "Atlanta Falcons", "Carolina Panthers", "New Orleans Saints", "Tampa Bay Buccaneers"
]; 

const nfcWest = [
    "Arizona Cardinals", "Los Angeles Rams", "San Francisco 49ers", "Seattle Seahawks"
]; 

const logoStyle = {
    width: '70px',
    height: '70px',
    marginRight: '10px',
    verticalAlign: 'middle'
};

const gridStyle = {
    display: 'grid', 
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    padding: '20px'
}

const buttonStyle = {
    background: '#b3fff0',
    border: '2px solid black',  
    borderRadius: '4px',
    backgroundColor: '#ddd',
    textAlign: 'center',
    cursor: 'pointer'
    
};


const TeamGrid = () => {
    const navigate = useNavigate(); 

    const handleTeamClick = (teamName) => {
        navigate(`/all_teams/${teamName}`); 
    };

    return (
        <div>
            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["AFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                AFC East
            </h2>
            <div style={gridStyle}>
                {afcEast.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team)} // eventually change to schedule
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["AFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                AFC North
            </h2>
            <div style={gridStyle}>
                {afcNorth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "schedule")}
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["AFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                AFC South
            </h2>
            <div style={gridStyle}>
                {afcSouth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "schedule")}
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["AFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                AFC West
            </h2>
            <div style={gridStyle}>
                {afcWest.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "schedule")}
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["NFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                NFC East
            </h2>
            <div style={gridStyle}>
                {nfcEast.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "schedule")}
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["NFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                NFC North
            </h2>
            <div style={gridStyle}>
                {nfcNorth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "schedule")}
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["NFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                NFC South
            </h2>
            <div style={gridStyle}>
                {nfcSouth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "schedule")}
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>
                <img 
                    src={teamLogos["NFC"]} 
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        verticalAlign: 'middle'
                    }}
                />
                NFC West
            </h2>
            <div style={gridStyle}>
                {nfcWest.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "schedule")}
                        style={buttonStyle}>
                            <h3>
                                <img 
                                    src={teamLogos[team]} 
                                    alt={`${team} logo`} 
                                    style={logoStyle}
                                /> 
                                {team}
                            </h3>
                    </div>
                ))}
            </div>

            <p>&nbsp;</p>
            <p>&nbsp;</p>

        </div>
    );
};


export default TeamGrid; 