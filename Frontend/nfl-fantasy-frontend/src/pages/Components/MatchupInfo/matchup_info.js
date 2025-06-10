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


const MatchupInfo = ({ game }) => {

    // Entire array containing game info
    const [matchupInfoData, setMatchupInfoData] = useState([]); 

    // Odds (not always available - usually available a week before the game)
    const [spread, setSpread] = useState("N/A");
    const [overUnder, setOverUnder] = useState("N/A"); 

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
                    <h2>Scoring Summary</h2>
                    {scoringPlays.map((play, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
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

                <p>&nbsp;</p>

                

                {/* Section 3: Leaders */}
                <div style={{ marginTop: '30px' }}>
                    <h2>Leaders</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '0.2fr 0.2fr 0.2fr', gap: '10px' }}>
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
                </div>

                <p>&nbsp;</p>

                


                {/* Section 4: Team Stats */}
                <div style={{ marginTop: '30px' }}>
                    <h2>Team Stats</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '0.1fr 0.1fr 0.1fr', gap: '10px' }}>
                        <div><strong>{game.awayTeam}</strong></div>
                        <div style={{ textAlign: 'center' }}><strong>Stats</strong></div>
                        <div style={{ textAlign: 'right' }}><strong>{game.homeTeam}</strong></div>
                        
                        <div>{boxscore?.teams[0].statistics?.firstDowns || 0}</div>
                        <div style={{ textAlign: 'center' }}>First Downs</div>
                        <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics?.firstDowns || 0}</div>
                        
                        <div>{boxscore?.teams[0].statistics?.totalYards || 0}</div>
                        <div style={{ textAlign: 'center' }}>Total Yards</div>
                        <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics?.totalYards || 0}</div>
                        
                        <div>{boxscore?.teams[0].statistics?.passingYards || 0}</div>
                        <div style={{ textAlign: 'center' }}>Passing Yards</div>
                        <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics?.passingYards || 0}</div>
                        
                        <div>{boxscore?.teams[0].statistics?.rushingYards || 0}</div>
                        <div style={{ textAlign: 'center' }}>Rushing Yards</div>
                        <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics?.rushingYards || 0}</div>
                        
                        <div>{boxscore?.teams[0].statistics?.turnovers || 0}</div>
                        <div style={{ textAlign: 'center' }}>Turnovers</div>
                        <div style={{ textAlign: 'right' }}>{boxscore?.teams[1].statistics?.turnovers || 0}</div>
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