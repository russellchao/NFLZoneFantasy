import React, {useEffect} from 'react'; 
import PositionGrid from './PositionGrid/position_grid';

const AllPositions = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

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