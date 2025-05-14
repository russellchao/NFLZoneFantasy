import React, { use } from 'react'; 
import { useNavigate } from 'react-router-dom';

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


const TeamGrid = () => {
    const navigate = useNavigate(); 

    const handleTeamClick = (teamName, section) => {
        navigate(`/teams/${teamName}/${section}`); // eventually change to schedule
    };

    return (
        <div>
            <h2 style={{ paddingLeft:"20px" }}>AFC East</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {afcEast.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")} // eventually change to schedule
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>AFC North</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {afcNorth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>AFC South</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {afcSouth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>AFC West</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {afcWest.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>NFC East</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {nfcEast.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>NFC North</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {nfcNorth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>NFC South</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {nfcSouth.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <h2 style={{ paddingLeft:"20px" }}>NFC West</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {nfcWest.map(team => (
                    <div key={team}
                        onClick={() => handleTeamClick(team, "stats")}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {team}
                    </div>
                ))}
            </div>

            <p>&nbsp;</p>
            <p>&nbsp;</p>

        </div>
    );
};


export default TeamGrid; 