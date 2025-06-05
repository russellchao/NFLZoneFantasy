import React, { use } from 'react'; 
import { useNavigate } from 'react-router-dom';

const offensivePositions = [
    "Quarterback", "Running Back", "Wide Receiver", "Tight End"
];

const defensivePositions = [
    "Defensive End", "Linebacker", "Cornerback", "Safety"
];

const specialPositions = [
    "Kicker"
];


const PositionGrid = () => {
    const navigate = useNavigate(); 

    const handleClick = (positionName) => {
        navigate('/position_page', { 
            state: { position: positionName },
            replace: true // Replace current history entry
        }); 
    };

    return (
        <div style={{ paddingLeft:'20px' }}>
            <h2>Offensive Positions</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {offensivePositions.map(position => (
                    <div key={position}
                        onClick={() => handleClick(position)}
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

            <h2>Defensive Positions</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {defensivePositions.map(position => (
                    <div key={position}
                        onClick={() => handleClick(position)}
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

            <h2>Special Teams Positions</h2>
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '20px'
            }}>
                {specialPositions.map(position => (
                    <div key={position}
                        onClick={() => handleClick(position)}
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
        </div>

    );
};


export default PositionGrid; 