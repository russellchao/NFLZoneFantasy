import React from 'react'; 
import PositionGrid from '../components/PositionGrid';

const Positions = () => {
    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Select a Position</h1>
            <p style={{ paddingLeft: '20px' }}>
                NOTE: For defense (and special teams) in fatasy football, you draft an entire team. Use the search tool to search for a particular defensive player.
            </p>
            <PositionGrid />
        </div>
    );
};

export default Positions; 