import React from 'react'; 
import TeamGrid from './TeamGrid/team_grid'; 

const AllTeams = () => {
    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Select a Team</h1>
            <p>&nbsp;</p>
            <TeamGrid />
        </div>
    );
};

export default AllTeams; 