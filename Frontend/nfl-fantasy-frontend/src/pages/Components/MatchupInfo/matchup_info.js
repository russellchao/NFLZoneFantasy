import React, { useState, useEffect, useRef } from 'react';


const MatchupInfo = ({ game }) => {

    const [matchupInfoData, setMatchupInfoData] = useState([]); 

    const initialFetchRef = useRef(false);

    
    useEffect(() => {
        // Get the info for this specific matchup

        if (initialFetchRef.current) {
            return; // Skip if we've already done the initial fetch
        } else {
            initialFetchRef.current = true; // Mark that we've done the initial fetch
        }

        (async () => {
            try {
                const response = await fetch(
                    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${game.gameId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json(); 
                console.log(data); 
                
                setMatchupInfoData(data); 

            } catch (error) {
                console.error("Failed to fetch matchup info data:", error);
            }
        })();
    }, []);
    



    if (game.status === "Scheduled" && initialFetchRef.current) {
        // Graphic for Scheduled games

        // Injury reports
        const homeTeamInjuries = matchupInfoData["injuries"][0]["injuries"]; 
        const awayTeamInjuries = matchupInfoData["injuries"][1]["injuries"]; 

        console.log(`${game.awayTeam} injuries:`); 
        console.log(awayTeamInjuries); 
        console.log(`${game.homeTeam} injuries:`); 
        console.log(homeTeamInjuries); 
        

        return (
            <div style={{ padding: '20px' }}>
                    
                <h1>{game.awayTeam} {game.awayTeamRecord} at {game.homeTeam} {game.homeTeamRecord} </h1>

                <h2>{game.weekNum} • {game.date}</h2>

                <h2>{game.venue}</h2>

                <h2>{game.startTime} on {game.broadcast}</h2>

                <p>&nbsp;</p>

                <h1>Injuries and Reserve</h1>

                <h2>{game.awayTeam}</h2>
                {awayTeamInjuries.map((injury, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <p>
                            <strong>{injury.athlete.displayName}</strong> - {injury.details["type"]}, {injury.status}
                            {injury.details?.returnDate && ` (Expected Return: ${injury.details.returnDate})`}
                        </p>
                    </div>
                ))}

                <h2>{game.homeTeam}</h2>
                {homeTeamInjuries.map((injury, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <p>
                            <strong>{injury.athlete.displayName}</strong> - {injury.details["type"]}, {injury.status}
                            {injury.details?.returnDate && ` (Expected Return: ${injury.details.returnDate})`}
                        </p>
                    </div>
                ))}



                <h2></h2>


                <p>&nbsp;</p>
                <p>&nbsp;</p>

            </div>
        );
    }








    if (game.status === "Final" && initialFetchRef.current) {
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