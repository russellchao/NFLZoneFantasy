import React from 'react'; 

const nflTeams = [
    "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills", "Carolina Panthers", "Chicago Bears", 
    "Cincinnati Bengals", "Cleveland Browns", "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers", 
    "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs", "Los Angeles Chargers", "Los Angeles Rams", 
    "Las Vegas Raiders", "Miami Dolphins", "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants",
    "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "Seattle Seahawks", "San Francisco 49ers", "Tampa Bay Buccaneers", 
    "Tennessee Titans", "Washington Commanders"
];


const TeamGrid = () => {
    return (
        <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            padding: '20px'
        }}>
            {nflTeams.map(team => (
                <div key={team}
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
    );
};


export default TeamGrid; 