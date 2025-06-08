import React, { useState, useEffect } from 'react';


const MatchupInfo = ({ game }) => {

    if (game.status === "Scheduled") {
        // Graphic for Scheduled games

        return (
            <div style={{ padding: '20px' }}>
                    
                <h1>{game.awayTeam} at {game.homeTeam} </h1>

                <h2>{game.weekNum} • {game.date}</h2>

                <h2></h2>

            </div>
        );
    }








    if (game.status === "Final") {
        // Graphic for Final games

        return (
            <div style={{ padding: '20px' }}>
                    
                <h1>{game.awayTeam} {game.awayTeamScore}</h1>
                <h1>{game.homeTeam} {game.homeTeamScore}</h1>

            </div>
        );
    }









    // At some point I'll add a graphic for Live games


};


export default MatchupInfo;