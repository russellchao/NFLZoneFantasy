import React, { use } from 'react'; 
import { useNavigate } from 'react-router-dom';

const positionNames = [
    "Quarterback", "Running Back", "Wide Receiver", "Tight End", "Linebacker", "Defensive Back", "Kicker"
];


const PositionGrid = () => {
    const navigate = useNavigate(); 

    const handleTeamClick = (positionName) => {
        navigate(`/positions/${positionName}`); 
    };

    return (
        <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            padding: '20px'
        }}>
            {positionNames.map(position => (
                <div key={position}
                    onClick={() => handleTeamClick(position)}
                    style={{
                        padding: '10px',
                        backgroundColor: '#ddd',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}>
                    {position}
                </div>
            ))}
        </div>
    );
};


export default PositionGrid; 