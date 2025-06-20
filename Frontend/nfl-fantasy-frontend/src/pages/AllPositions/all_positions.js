import React from 'react'; 
import PositionGrid from './PositionGrid/position_grid';

const AllPositions = () => {
    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Select a Position</h1>
            <p style={{ paddingLeft: '20px' }}>
                NOTE: For defense (and special teams) in fantasy football, you draft an entire team.
            </p>
            <p>&nbsp;</p>
            <PositionGrid />
        </div>
    );
};

export default AllPositions; 