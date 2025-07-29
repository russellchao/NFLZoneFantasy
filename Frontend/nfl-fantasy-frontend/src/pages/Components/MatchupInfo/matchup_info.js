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

const smallLogoStyle = {
    width: '30px',
    height: '30px',
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
    borderRadius: '12px'
};


const MatchupInfo = ({ game }) => {

    // Entire array containing game info
    const [matchupInfoData, setMatchupInfoData] = useState([]); 

    // Variables handling sections for matchup info for final games
    const [showScoring, setShowScoring] = useState(true);
    const [showLeaders, setShowLeaders] = useState(true);
    const [showTeamStats, setShowTeamStats] = useState(true);
    const [showPlayerStats, setShowPlayerStats] = useState(true); 
    const [playerStatsIdx, setPlayerStatsIdx] = useState(0); // 0 for the away team, 1 for the home team. Shows the away team by default
    const [showDriveInfo, setShowDriveInfo] = useState(true); 
    const [expandedDrives, setExpandedDrives] = useState({});

    // Variables handling sections for matchup info for scheduled games
    const [showWinProb, setShowWinProb] = useState(true);
    const [showOdds, setShowOdds] = useState(true);
    const [showInjuries, setShowInjuries] = useState(true);

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
        const drives = matchupInfoData["drives"];

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
                                <div key={index} style={{ paddingLeft: '10px', paddingTop: '10px' }}>
                                    <React.Fragment key={index}>
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
                                    </React.Fragment>
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
                    <h2>
                        Player Stats
                        <button 
                            onClick={() => setShowPlayerStats(!showPlayerStats)}
                            style={{
                                marginLeft: '20px',
                                padding: '5px 10px',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showPlayerStats ? 'Hide' : 'Show'}
                        </button>
                    </h2>
                    {showPlayerStats && (
                        <div style={boxStyle}>
                            <div style={{ paddingLeft: '10px' }}>
                                <h3>
                                    {boxscore?.players[playerStatsIdx].team?.displayName || "N/A"}
                                    <button
                                        onClick={() => setPlayerStatsIdx(playerStatsIdx === 0 ? 1 : 0)}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#006666'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#004d4d'}
                                        style={{
                                            marginLeft: '15px',
                                            padding: '4px 10px',
                                            backgroundColor: '#004d4d',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '0.7em',
                                            fontFamily: 'Segoe UI, sans-serif'
                                        }}
                                    >
                                        Switch Team
                                    </button>
                                </h3>

                                {/* Passing Stats */}
                                <h3>Passing</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '10px', padding: '10px 0' }}>
                                    <div><strong>Player</strong></div>
                                    <div><strong>C/ATT</strong></div>
                                    <div><strong>YDS</strong></div>
                                    <div><strong>AVG</strong></div>
                                    <div><strong>TD</strong></div>
                                    <div><strong>INT</strong></div>
                                    <div><strong>SACKS</strong></div>
                                    <div><strong>QBR</strong></div>
                                    <div><strong>RTG</strong></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '10px' }}>
                                    {boxscore?.players[playerStatsIdx]?.statistics[0]?.athletes?.map((athlete, index) => (
                                        <React.Fragment key={index}>
                                            <div>{athlete.athlete.displayName}</div>
                                            <div>{athlete.stats[0]}</div>
                                            <div>{athlete.stats[1]}</div>
                                            <div>{athlete.stats[2]}</div>
                                            <div>{athlete.stats[3]}</div>
                                            <div>{athlete.stats[4]}</div>
                                            <div>{athlete.stats[5]}</div>
                                            <div>{athlete.stats[6]}</div>
                                            <div>{athlete.stats[7]}</div>
                                        </React.Fragment>
                                    )) || "N/A"}
                                </div>

                                <br></br>
                                <hr></hr>

                                {/* Rushing Stats */}
                                <h3>Rushing</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', padding: '10px 0' }}>
                                    <div><strong>Player</strong></div>
                                    <div><strong>CAR</strong></div>
                                    <div><strong>YDS</strong></div>
                                    <div><strong>AVG</strong></div>
                                    <div><strong>TD</strong></div>
                                    <div><strong>LONG</strong></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                                    {boxscore?.players[playerStatsIdx]?.statistics[1]?.athletes?.map((athlete, index) => (
                                        <React.Fragment key={index}>
                                            <div>{athlete.athlete.displayName}</div>
                                            <div>{athlete.stats[0]}</div>
                                            <div>{athlete.stats[1]}</div>
                                            <div>{athlete.stats[2]}</div>
                                            <div>{athlete.stats[3]}</div>
                                            <div>{athlete.stats[4]}</div>
                                        </React.Fragment>
                                    )) || "N/A"}
                                </div>

                                <br></br>
                                <hr></hr>

                                {/* Receiving Stats */}
                                <h3>Receiving</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', padding: '10px 0' }}>
                                    <div><strong>Player</strong></div>
                                    <div><strong>REC</strong></div>
                                    <div><strong>YDS</strong></div>
                                    <div><strong>AVG</strong></div>
                                    <div><strong>TD</strong></div>
                                    <div><strong>LONG</strong></div>
                                    <div><strong>TGTS</strong></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                                    {boxscore?.players[playerStatsIdx]?.statistics[2]?.athletes?.map((athlete, index) => (
                                        <React.Fragment key={index}>
                                            <div>{athlete.athlete.displayName}</div>
                                            <div>{athlete.stats[0]}</div>
                                            <div>{athlete.stats[1]}</div>
                                            <div>{athlete.stats[2]}</div>
                                            <div>{athlete.stats[3]}</div>
                                            <div>{athlete.stats[4]}</div>
                                            <div>{athlete.stats[5]}</div>
                                        </React.Fragment>
                                    )) || "N/A"}
                                </div>

                                <br></br>
                                <hr></hr>

                                {/* Defense Stats */}
                                <h3>Defense</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px', padding: '10px 0' }}>
                                    <div><strong>Player</strong></div>
                                    <div><strong>TCK</strong></div>
                                    <div><strong>SOLO</strong></div>
                                    <div><strong>SACKS</strong></div>
                                    <div><strong>TFL</strong></div>
                                    <div><strong>PD</strong></div>
                                    <div><strong>QB HITS</strong></div>
                                    <div><strong>TD</strong></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}>
                                    {boxscore?.players[playerStatsIdx]?.statistics[4]?.athletes?.map((athlete, index) => (
                                        <React.Fragment key={index}>
                                            <div>{athlete.athlete.displayName}</div>
                                            <div>{athlete.stats[0]}</div>
                                            <div>{athlete.stats[1]}</div>
                                            <div>{athlete.stats[2]}</div>
                                            <div>{athlete.stats[3]}</div>
                                            <div>{athlete.stats[4]}</div>
                                            <div>{athlete.stats[5]}</div>
                                            <div>{athlete.stats[6]}</div>
                                        </React.Fragment>
                                    )) || "N/A"}
                                </div>

                                <br></br>
                                <hr></hr>

                                {/* Interceptions */}
                                <h3>Interceptions</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '10px 0' }}>
                                    <div><strong>Player</strong></div>
                                    <div><strong>INT</strong></div>
                                    <div><strong>YDS</strong></div>
                                    <div><strong>TD</strong></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                                    {boxscore?.players[playerStatsIdx]?.statistics[5]?.athletes?.map((athlete, index) => (
                                        <React.Fragment key={index}>
                                            <div>{athlete.athlete.displayName}</div>
                                            <div>{athlete.stats[0]}</div>
                                            <div>{athlete.stats[1]}</div>
                                            <div>{athlete.stats[2]}</div>
                                        </React.Fragment>
                                    )) || "N/A"}
                                </div>

                                <br></br>
                                <hr></hr>

                                {/* Kicking */}
                                <h3>Kicking</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', padding: '10px 0' }}>
                                    <div><strong>Player</strong></div>
                                    <div><strong>FG</strong></div>
                                    <div><strong>PCT</strong></div>
                                    <div><strong>LONG</strong></div>
                                    <div><strong>XP</strong></div>
                                    <div><strong>PTS</strong></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                                    {boxscore?.players[playerStatsIdx]?.statistics[8]?.athletes?.map((athlete, index) => (
                                        <React.Fragment key={index}>
                                            <div>{athlete.athlete.displayName}</div>
                                            <div>{athlete.stats[0]}</div>
                                            <div>{athlete.stats[1]}</div>
                                            <div>{athlete.stats[2]}</div>
                                            <div>{athlete.stats[3]}</div>
                                            <div>{athlete.stats[4]}</div>
                                        </React.Fragment>
                                    )) || "N/A"}
                                </div>

                            </div>

                            <p>&nbsp;</p>
                            
                        </div>
                    )}
                    

                </div>


                <p>&nbsp;</p>


                {/* Section 6: Drive Information */}
                <div style={{ marginTop: '30px' }}>
                    <h2>
                        Drive Information
                        <button 
                            onClick={() => setShowDriveInfo(!showDriveInfo)}
                            style={{
                                marginLeft: '20px',
                                padding: '5px 10px',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            {showDriveInfo ? 'Hide' : 'Show'}
                        </button>
                    </h2>

                    {showDriveInfo && (
                        <div style={boxStyle}>
                            <div style={{paddingLeft: '10px'}}>
                                {drives?.previous?.map((drive, index) => (
                                    <React.Fragment key={index}>
                                        <p style={{fontSize: '1.1em'}}>
                                            <img 
                                                src={teamLogos[drive.team.displayName]} 
                                                alt={`${drive.team.displayName} logo`} 
                                                style={smallLogoStyle}
                                            />

                                            <strong>{drive.displayResult}</strong>
                                            {" - "}
                                            {drive.description}
                                            {" - "}
                                            <strong>{boxscore.teams[0].team.abbreviation} {drive.plays[drive.plays.length - 1]?.awayScore}</strong> 
                                            {", "}
                                            <strong>{boxscore.teams[1].team.abbreviation} {drive.plays[drive.plays.length - 1]?.homeScore}</strong> 
                                        
                                            <button
                                                onClick={() => setExpandedDrives(prev => ({
                                                    ...prev,
                                                    [index]: !prev[index]
                                                }))}
                                                onMouseOver={(e) => e.target.style.backgroundColor = '#006666'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = '#004d4d'}
                                                style={{
                                                    marginLeft: '15px',
                                                    padding: '4px 10px',
                                                    backgroundColor: '#004d4d',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.7em',
                                                    fontFamily: 'Segoe UI, sans-serif'
                                                }}
                                            >
                                                {expandedDrives[index] ? 'Collapse' : 'Expand'}
                                            </button>
                                        </p>
                                        
                                        {expandedDrives[index] && drive?.plays?.map((play, playIdx) => (
                                            <p key={playIdx}>
                                                <strong>{`${play.period?.number > 4 ? 'OT' : `Q${play.period?.number}`} at ${play.clock.displayValue}`}</strong>
                                                {play.start.downDistanceText && <strong style={{color:'blue'}}>{` - ${play.start.downDistanceText}`}</strong>}
                                                {` - ${play.text}`}
                                            </p>
                                        ))}

                                        <hr></hr>
                                    </React.Fragment>
                                )) || "N/A"}
                            </div>
                        </div>
                    )}


                </div>

                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
        );
    }




    if (game.status === "Scheduled" && initialFetchRef.current) {
        // Graphic for Scheduled games

        // If the teams for the particular matchup are TBD (e.g. a playoff game whose teams are unknown)
        if (game.awayTeam === "TBD TBD" || game.homeTeam === "TBD TBD") {
            return (
                <h2 style={{ paddingLeft:'20px' }}>
                    Matchup information not available.
                </h2>
            );
        };


        // Win probablity (Not applicable for Preseason Games)
        let awayTeamWinChance = "N/A";
        let homeTeamWinChance = "N/A"; 

        if (matchupInfoData["predictor"]) {
            awayTeamWinChance = matchupInfoData["predictor"]["awayTeam"]["gameProjection"] + "%";
            homeTeamWinChance = matchupInfoData["predictor"]["homeTeam"]["gameProjection"] + "%";
        }


        // Odds - set the odds once they become available
        let spread = "N/A";
        let overUnder = "N/A";
        
        
        // Injury reports
        const homeTeamInjuries = matchupInfoData["injuries"][0]["injuries"]; 
        const awayTeamInjuries = matchupInfoData["injuries"][1]["injuries"]; 
        
        console.log(`${game.awayTeam} injuries:`); 
        console.log(awayTeamInjuries); 
        console.log(`${game.homeTeam} injuries:`); 
        console.log(homeTeamInjuries); 
        

        return (
            <div style={{ padding: '20px' }}>

            {/* Section 1: General Game Info */}
            <h2 style={{ textAlign: 'center' }}>{game.weekNum}</h2>
            <h2 style={{ textAlign: 'center' }}>{game.date}</h2>
            <h2 style={{ textAlign: 'center' }}>{game.startTime} on {game.broadcast}</h2>
            
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
                <div>
                    <h2>
                        <img 
                            src={teamLogos[game.awayTeam]} 
                            alt={`${game.awayTeam} logo`} 
                            style={logoStyle}
                        /> 
                        {game.awayTeam} ({game.awayTeamRecord})
                    </h2>
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
                <div>
                    <h2>
                        <img 
                            src={teamLogos[game.homeTeam]} 
                            alt={`${game.homeTeam} logo`} 
                            style={logoStyle}
                        />
                        {game.homeTeam} ({game.homeTeamRecord})
                    </h2>
                </div>
            </div>

            <h2 style={{ textAlign: 'center' }}>{game.venue}</h2>

            <p>&nbsp;</p>



            {/* Section 2: Win Probability */}
            <div style={{ marginTop: '30px' }}>
                <h2>
                    Win Probability
                    <button 
                        onClick={() => setShowWinProb(!showWinProb)}
                        style={{
                            marginLeft: '20px',
                            padding: '5px 10px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        {showWinProb ? 'Hide' : 'Show'}
                    </button>
                </h2>
                {showWinProb && (
                    <div style={boxStyle}>
                        <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>
                            <h3>{game.awayTeam}: {awayTeamWinChance}</h3>
                            <h3>{game.homeTeam}: {homeTeamWinChance}</h3>
                        </div>
                    </div>
                )}
            </div>

            <p>&nbsp;</p>



            {/* Section 3: Odds */}
            <div style={{ marginTop: '30px' }}>
                <h2>
                    Odds
                    <button 
                        onClick={() => setShowOdds(!showOdds)}
                        style={{
                            marginLeft: '20px',
                            padding: '5px 10px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        {showOdds ? 'Hide' : 'Show'}
                    </button>
                </h2>
                {showOdds && (
                    <div style={boxStyle}>
                        <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>
                            <h3>Spread: {spread}</h3>
                            <h3>Over/Under: {overUnder}</h3>
                        </div>
                    </div>
                )}
            </div>

            <p>&nbsp;</p>



            {/* Section 4: Injuries */}
            <div style={{ marginTop: '30px' }}>
                <h2>
                    Injuries
                    <button 
                        onClick={() => setShowInjuries(!showInjuries)}
                        style={{
                            marginLeft: '20px',
                            padding: '5px 10px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        {showInjuries ? 'Hide' : 'Show'}
                    </button>
                </h2>
                {showInjuries && (
                    <div style={boxStyle}>
                        <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>
                            <h3>{game.awayTeam}</h3>
                            {awayTeamInjuries.map((injury, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <p>
                                        <strong>{injury.athlete.displayName}</strong> - {injury.details["type"]}, {injury.status}
                                        {injury.details?.returnDate && ` (Expected Return: ${injury.details.returnDate})`}
                                    </p>
                                </div>
                            ))}

                            <hr></hr>

                            <h3>{game.homeTeam}</h3>
                            {homeTeamInjuries.map((injury, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <p>
                                        <strong>{injury.athlete.displayName}</strong> - {injury.details["type"]}, {injury.status}
                                        {injury.details?.returnDate && ` (Expected Return: ${injury.details.returnDate})`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
        </div>
        );
    }



    // At some point I'll add a graphic for Live games


};


export default MatchupInfo;