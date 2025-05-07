import React from 'react';
import { useParams } from 'react-router-dom';

const TeamPage = () => {
    const { teamName } = useParams(); 

    return (
        <div>
            <h1>{ teamName }</h1>
            <h2>Passing</h2>
            {/* Fetch data here */}
        </div>
    );
};

export default TeamPage; 