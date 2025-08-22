import React, {useEffect} from 'react'; 
import TeamGrid from './TeamGrid/team_grid'; 

const AllTeams = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Select a Team</h1>
            <p>&nbsp;</p>
            <TeamGrid />
        </div>
    );
};

export default AllTeams; 