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


const boxStyle = {
    background: '#b3fff0',
    margin: '0%',
    width: '90%',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0px 0',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
    border: '2px solid black',  
    borderRadius: '4px'
};


const Roster = ({ teamName, teamSeason }) => {

    // Roster info
    const [rosterInfo, setRosterInfo] = useState([]); 

    
    useEffect(() => {
        // Get the info for this team's roster for the given season

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


    // I specifically want the first four positions listed in the following order: QB, RB, WR, TE. Everything else is fine
    const firstFourPositions = ['QB', 'RB', 'WR', 'TE'];


    return (
        <div style={{ paddingLeft: '20px' }}>
            {rosterInfo.athletes && (() => {
                const grouped = groupPlayersByPosition(rosterInfo.athletes);
                const orderedPositions = [
                    ...firstFourPositions,
                    ...Object.keys(grouped).filter(pos => !firstFourPositions.includes(pos))
                ];
                
                return (
                    <div style={boxStyle}>
                        <div style={{ 
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '1px',
                            width: '100%',
                            fontSize: '1.1em',
                            paddingLeft: '10px'
                        }}>
                            {orderedPositions.map(position => (
                                grouped[position] && (
                                    <div key={position} style={{ 
                                        marginBottom: '20px',
                                        minWidth: '200px'
                                    }}>
                                        <h3>{position}</h3>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            padding: 0,
                                            margin: 0
                                        }}>
                                            {grouped[position].map(player => (
                                                <li key={player.id} style={{ 
                                                    marginBottom: '5px',
                                                    fontSize: '0.9em'
                                                }}>
                                                    {player.fullName} - #{player.jersey || 'N/A'}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                );
            })()}
        </div>
    );


};

export default Roster; 