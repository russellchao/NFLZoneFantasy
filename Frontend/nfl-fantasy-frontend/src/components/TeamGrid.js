import React from 'react'; 

const nflTeams = [
    "ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE",
    "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAX", "KC",
    "LAC", "LAR", "LV", "MIA", "MIN", "NE", "NO", "NYG",
    "NYJ", "PHI", "PIT", "SEA", "SF", "TB", "TEN", "WAS"
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