import React, {useState, useEffect, useRef} from 'react';

const teamIDs = {
    "Arizona Cardinals": 22, 
    "Atlanta Falcons": 1, 
    "Baltimore Ravens": 33, 
    "Buffalo Bills": 2, 
    "Carolina Panthers": 29, 
    "Chicago Bears": 3, 
    "Cincinnati Bengals": 4, 
    "Cleveland Browns": 5, 
    "Dallas Cowboys": 6, 
    "Denver Broncos": 7, 
    "Detroit Lions": 8, 
    "Green Bay Packers": 9, 
    "Houston Texans": 34, 
    "Indianapolis Colts": 11, 
    "Jacksonville Jaguars": 30, 
    "Kansas City Chiefs": 12, 
    "Los Angeles Chargers": 24, 
    "Los Angeles Rams": 14, 
    "Las Vegas Raiders": 13, 
    "Miami Dolphins": 15, 
    "Minnesota Vikings": 16, 
    "New England Patriots": 17, 
    "New Orleans Saints": 18, 
    "New York Giants": 19,
    "New York Jets": 20, 
    "Philadelphia Eagles": 21, 
    "Pittsburgh Steelers": 23, 
    "Seattle Seahawks": 26, 
    "San Francisco 49ers": 25, 
    "Tampa Bay Buccaneers": 27, 
    "Tennessee Titans": 10, 
    "Washington Commanders": 28
};


const Roster = ({ teamName, teamSeason }) => {

    // Roster info
    const [rosterInfo, setRosterInfo] = useState([]); 

    // Track initial fetch
    const initialFetchRef = useRef(false);

    useEffect(() => {
        // Get the info for this team's roster for the given season

        if (initialFetchRef.current) {
            return; // Skip if we've already done the initial fetch
        } else {
            initialFetchRef.current = true; // Mark that we've done the initial fetch
        }

        (async () => {
            try {
                const response = await fetch(
                    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamIDs[teamName]}/roster?year=${teamSeason}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json(); 
                console.log(data); 

                setRosterInfo(data); 

            } catch (error) {
                console.error("Failed to fetch matchup info data:", error);
            }
        })();
    }, []);


    const groupPlayersByPosition = (athletes) => {
        const grouped = {};
        if (athletes) {
            // Iterate through each section (offense, defense, specialTeam)
            athletes.forEach(section => {
                if (section.items) {
                    section.items.forEach(player => {
                        const position = player.position?.abbreviation || 'N/A';
                        if (!grouped[position]) {
                            grouped[position] = [];
                        }
                        grouped[position].push(player);
                    });
                }
            });
        }
        return grouped;
    };



    return (
        <div style={{ paddingLeft: '20px' }}>
            <h2>{teamSeason} {teamName} Roster</h2>
            {rosterInfo.athletes && Object.entries(groupPlayersByPosition(rosterInfo.athletes)).map(([position, players]) => (
                <div key={position} style={{ marginBottom: '20px' }}>
                    <h3>{position}</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {players.map(player => (
                            <li key={player.id} style={{ marginBottom: '5px' }}>
                                {player.fullName} - #{player.jersey || 'N/A'}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );


};

export default Roster; 