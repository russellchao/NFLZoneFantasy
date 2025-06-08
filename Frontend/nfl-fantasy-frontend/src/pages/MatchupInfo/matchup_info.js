import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const MatchupInfo = () => {

    const { awayTeam, homeTeam, week, season } = useParams();




    return (
        <div style={{ padding: '20px' }}>
                
            <h2>Matchup Info</h2>
            <p>{awayTeam} vs. {homeTeam}, {week}, {season} </p>

        </div>
    );

};


export default MatchupInfo;