import React, { useState, useEffect, useRef } from 'react';

// Import all logo images
const logoImages = require.context('../../../logos', false, /\.(png|jpe?g|svg)$/);

// Create a mapping of team abbreviations to logo paths
const teamLogos = {};
logoImages.keys().forEach(key => {
    // Remove './' from the start and file extension from the end
    const teamAbbr = key.replace(/^\.\//, '').replace(/\.(png|jpe?g|svg)$/, '');
    teamLogos[teamAbbr] = logoImages(key);
});

const logoStyle = {
    width: '70px',
    height: '70px',
    marginRight: '10px',
    verticalAlign: 'middle'
};

const losingTeamStyle = {
    opacity: 0.85,
    color: '#666'
};

const boxStyle = {
    background: '#b3fff0',
    margin: '0%',
    width: '100%',
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



const MatchupInfo = ({ game }) => {

    // Entire array containing game info
    const [matchupInfoData, setMatchupInfoData] = useState([]); 

    // Odds (not always available - usually available a week before the game)
    const [spread, setSpread] = useState("N/A");
    const [overUnder, setOverUnder] = useState("N/A"); 

    // Variables handling sections for matchup info for final games
    const [showScoring, setShowScoring] = useState(true);
    const [showLeaders, setShowLeaders] = useState(true);
    const [showTeamStats, setShowTeamStats] = useState(true);
    const [showPlayerStats, setShowPlayerStats] = useState(true); 
    const [playerStatsIdx, setPlayerStatsIdx] = useState(0); // 0 for the away team, 1 for the home team. Shows the away team by default

    // Track initial fetch
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







    if (game.status === "Final" && initialFetchRef.current) {
        // Extract relevant stats from matchupInfoData
        const boxscore = matchupInfoData["boxscore"];
        const scoringPlays = matchupInfoData["scoringPlays"];
        const leaders = matchupInfoData["leaders"];

        return (
            <div style={{ padding: '20px' }}>

                {/* Section 1: General Matchup Info */}
                <h2 style={{ textAlign: 'center' }}>{game.weekNum}</h2>
                <h2 style={{ textAlign: 'center' }}>{game.date}</h2>
                <h2 style={{ textAlign: 'center' }}>{game.overtime ? 'FINAL/OT' : 'FINAL'}</h2>
                
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    marginBottom: '30px',
                    textAlign: 'center'
                }}>
                    {/* Away Team */}
                    <div style={parseInt(game.awayTeamScore) < parseInt(game.homeTeamScore) ? losingTeamStyle : {}}>
                        <h2>
                            <img 
                                src={teamLogos[game.awayTeam]} 
                                alt={`${game.awayTeam} logo`} 
                                style={logoStyle}
                            /> 
                            {game.awayTeam} ({game.awayTeamRecord})
                        </h2>
                        <h1 style={{ fontSize: '2.5em', margin: '10px 0' }}>{game.awayTeamScore}</h1>
                    </div>

                    {/* Separator */}
                    <div style={{ 
                        fontSize: '2em',
                        fontWeight: 'bold',
                        margin: '0 20px'
                    }}>
                        @
                    </div>

                    {/* Home Team */}
                    <div style={parseInt(game.homeTeamScore) < parseInt(game.awayTeamScore) ? losingTeamStyle : {}}>
                        <h2>
                            <img 
                                src={teamLogos[game.homeTeam]} 
                                alt={`${game.homeTeam} logo`} 
                                style={logoStyle}
                            />
                            {game.homeTeam} ({game.homeTeamRecord})</h2>
                        <h1 style={{ fontSize: '2.5em', margin: '10px 0' }}>{game.homeTeamScore}</h1>
                    </div>
                </div>

                <h2 style={{ textAlign: 'center' }}>{game.venue}</h2>

                <p>&nbsp;</p>

                
                {/* Section 2: Scoring Summary */}
                <div style={{ marginTop: '30px' }}>
                    <h2>
                        Scoring Summary
                        <button 
                            onClick={() => setShowScoring(!showScoring)}
                            style={{
                                marginLeft: '20px',
                                padding: '5px 10px',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showScoring ? 'Hide' : 'Show'}
                        </button>
                    </h2>
                    {showScoring && (
                        <div style={boxStyle}>
                            {scoringPlays.map((play, index) => (
                                <div key={index} style={{ paddingLeft: '10px' }}>
                                    <p>
                                        <strong>
                                            {play.period?.number > 4 ? 'OT' : `Q${play.period?.number}`}
                                            {" at "}
                                            {play?.clock?.displayValue} 
                                        </strong>
                                        {` - (${play.team.abbreviation}) ${play.text}`}

                                        <br></br>
                                        <br></br>

                                        {boxscore.teams[0].team.abbreviation === play.team.abbreviation ? 
                                            <strong>{boxscore.teams[0].team.abbreviation} {play.awayScore}</strong> :
                                            <span>{boxscore.teams[0].team.abbreviation} {play.awayScore}</span>
                                        }
                                        {", "}
                                        {boxscore.teams[1].team.abbreviation === play.team.abbreviation ? 
                                            <strong>{boxscore.teams[1].team.abbreviation} {play.homeScore}</strong> :
                                            <span>{boxscore.teams[1].team.abbreviation} {play.homeScore}</span>
                                        }
                                        
                                        <hr></hr>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                

                <p>&nbsp;</p>

                

                {/* Section 3: Leaders */}
                <div style={{ marginTop: '30px' }}>
                    <h2>
                        Leaders
                        <button 
                            onClick={() => setShowLeaders(!showLeaders)}
                            style={{
                                marginLeft: '20px',
                                padding: '5px 10px',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showLeaders ? 'Hide' : 'Show'}
                        </button>
                    </h2>
                    {showLeaders && (
                        <div style={boxStyle}>
                            <div style={{ display: 'grid', paddingLeft: '10px', gridTemplateColumns: '0.25fr 0.25fr 0.25fr', gap: '10px' }}>
                                <h3>{game.awayTeam}</h3>
                                <h3 style={{ textAlign: 'center' }}>Category</h3>
                                <h3 style={{ textAlign: 'right' }}>{game.homeTeam}</h3>

                                {/* Null checks here. Of all 5 categories (passing, rushing, receiving, tackles, sacks), 
                                    there is a chance a game could have 0 total sacks */}
                                
                                {/* Passing */}
                                <div>
                                    {leaders[1]?.leaders?.[0]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders[1]?.leaders?.[0]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                                <div style={{ textAlign: 'center' }}>Passing</div>
                                <div style={{ textAlign: 'right' }}>
                                    {leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders?.[0]?.leaders?.[0]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                                
                                {/* Rushing */}
                                <div>
                                    {leaders[1]?.leaders?.[1]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders[1]?.leaders?.[1]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                                <div style={{ textAlign: 'center' }}>Rushing</div>
                                <div style={{ textAlign: 'right' }}>
                                    {leaders?.[0]?.leaders?.[1]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders?.[0]?.leaders?.[1]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                                
                                {/* Receiving */}
                                <div>
                                    {leaders[1]?.leaders?.[2]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders[1]?.leaders?.[2]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                                <div style={{ textAlign: 'center' }}>Recieving</div>
                                <div style={{ textAlign: 'right' }}>
                                    {leaders?.[0]?.leaders?.[2]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders?.[0]?.leaders?.[2]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                            
                                {/* Tackles */}
                                <div>
                                    {leaders[1]?.leaders?.[3]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders[1]?.leaders?.[3]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                                <div style={{ textAlign: 'center' }}>Tackles</div>
                                <div style={{ textAlign: 'right' }}>
                                    {leaders?.[0]?.leaders?.[3]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders?.[0]?.leaders?.[3]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>

                                {/* Sacks */}
                                <div>
                                    {leaders[1]?.leaders?.[4]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders[1]?.leaders?.[4]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                                <div style={{ textAlign: 'center' }}>Sacks</div>
                                <div style={{ textAlign: 'right' }}>
                                    {leaders?.[0]?.leaders?.[4]?.leaders?.[0]?.athlete?.displayName ?? 'N/A'} 
                                    {": "} 
                                    {leaders?.[0]?.leaders?.[4]?.leaders?.[0]?.displayValue ?? 'N/A'}
                                </div>
                            </div>

                            <br></br>
                        </div>
                    )}
                    
                </div>

                


                <p>&nbsp;</p>

                {/* Section 4: Team Stats */}
                <div style={{ marginTop: '30px' }}>
                    <h2>
                        Team Stats
                        <button 
                            onClick={() => setShowTeamStats(!showTeamStats)}
                            style={{
                                marginLeft: '20px',
                                padding: '5px 10px',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showTeamStats ? 'Hide' : 'Show'}
                        </button>
                    </h2>
                    {showTeamStats && (
                        <div style={boxStyle}>
                            <div style={{ display: 'grid', paddingLeft: '10px', gridTemplateColumns: '0.15fr 0.15fr 0.15fr', gap: '10px' }}>
                                <h3>{game.awayTeam}</h3>
                                <h3 style={{ textAlign: 'center' }}>Stats</h3>
                                <h3 style={{ textAlign: 'right' }}>{game.homeTeam}</h3>

                                <div>{boxscore?.teams[0].statistics[7]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Total Yards</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[7]?.displayValue || 0}</div>
                                
                                <div>{boxscore?.teams[0].statistics[10]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Passing Yards</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[10]?.displayValue || 0}</div>
                                
                                <div>{boxscore?.teams[0].statistics[15]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Rushing Yards</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[15]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[8]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Yards Per Play</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[8]?.displayValue || 0}</div>
                                
                                <div>{boxscore?.teams[0].statistics[0]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>First Downs</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[0]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[4]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>3rd Down Efficiency</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[4]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[5]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>4th Down Efficiency</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[5]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[6]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Total Plays</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[6]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[9]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Total Drives</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[9]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[14]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Sacks Allowed-Yards Lost</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[14]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[22]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Interceptions Thrown</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[22]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[21]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Fumbles Lost</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[21]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[19]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Penalties-Yards</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[19]?.displayValue || 0}</div>

                                <div>{boxscore?.teams[0].statistics[24]?.displayValue || 0}</div>
                                <div style={{ textAlign: 'center' }}>Time of Possession</div>
                                <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics[24]?.displayValue || 0}</div>
                            </div>

                            <br></br>
                        </div>
                    )}
                    
                </div>


                

                <p>&nbsp;</p>


                {/* Section 5: Player Stats */}
                <div style={{ marginTop: '30px' }}>
                    <h2>Player Stats</h2>
                        <div style={{ paddingLeft: '10px' }}>
                            <h3>
                                {boxscore?.players[playerStatsIdx].team?.displayName || "N/A"}
                                <button
                                    onClick={() => setPlayerStatsIdx(playerStatsIdx === 0 ? 1 : 0)}
                                    style={{
                                        marginLeft: '20px',
                                        padding: '5px 10px',
                                        marginBottom: '10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Switch Team
                                </button>
                            </h3>

                            <h3>Passing</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '10px', padding: '10px 0' }}>
                                <div><strong>Name</strong></div>
                                <div><strong>C/ATT</strong></div>
                                <div><strong>YDS</strong></div>
                                <div><strong>AVG</strong></div>
                                <div><strong>TD</strong></div>
                                <div><strong>INT</strong></div>
                                <div><strong>SACKS</strong></div>
                                <div><strong>QBR</strong></div>
                                <div><strong>RTG</strong></div>
                            </div>
                            <div>
                                {boxscore?.players[playerStatsIdx]?.statistics[0].athletes || "N/A"}
                            </div>




                        </div>


                    
                </div>






                <p>&nbsp;</p>




                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
        );
    }














    



    if (game.status === "Scheduled" && initialFetchRef.current) {
        // Graphic for Scheduled games

        // Win probablity
        const awayTeamWinChance = matchupInfoData["predictor"]["awayTeam"]["gameProjection"];
        const homeTeamWinChance = matchupInfoData["predictor"]["homeTeam"]["gameProjection"];


        // Odds - set the odds once they become available

        
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

                <h1>Win Probability</h1>

                <h2>{game.awayTeam}: {awayTeamWinChance}%</h2>
                <h2>{game.homeTeam}: {homeTeamWinChance}%</h2>




                <p>&nbsp;</p>

                <h1>Odds</h1>

                <h2>Spread: {spread}</h2>
                <h2>O/U: {overUnder}</h2>





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






    // At some point I'll add a graphic for Live games


};


export default MatchupInfo;