import React, {useState, useEffect, useRef} from 'react';
import { fetchScheduleByWeek, fetchUpdateScheduleDB } from '../../API/schedule_api';
import { deleteOldMatchups, updateMatchups } from '../../API/prediction_api';

// Import all logo images
const logoImages = require.context('../../logos/NFL Logos', false, /\.(png|jpe?g|svg)$/);

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

const gridStyle = {
    display: 'grid', 
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    padding: '20px',
    rowGap: '80px'
};

const buttonStyle = {
    padding: '5px 12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: '#2e8185ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.2s'
};

const buttonStyleSelected = {
    padding: '5px 12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: '#8ac7ebff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.2s'
};

const buttonStyleCorrect = {
    padding: '5px 12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: '#0eae3eff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.2s'
};

const buttonStyleWrong = {
    padding: '5px 12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: '#e01313ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.2s'
};

const boxStyle = {
    background: 'linear-gradient(135deg, #409398ff 0%, #296b88ff 100%)',
    margin: '0%',
    width: '98%',
    minWidth: '350px',
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0px 0',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
    border: '2px solid black',  
    borderRadius: '12px'
};

const teamAbbr = {
    "Arizona Cardinals": "ARZ", 
    "Atlanta Falcons": "ATL", 
    "Baltimore Ravens": "BAL", 
    "Buffalo Bills": "BUF", 
    "Carolina Panthers": "CAR", 
    "Chicago Bears": "CHI", 
    "Cincinnati Bengals": "CIN", 
    "Cleveland Browns": "CLE", 
    "Dallas Cowboys": "DAL", 
    "Denver Broncos": "DEN", 
    "Detroit Lions": "DET", 
    "Green Bay Packers": "GB", 
    "Houston Texans": "HOU", 
    "Indianapolis Colts": "IND", 
    "Jacksonville Jaguars": "JAX", 
    "Kansas City Chiefs": "KC", 
    "Los Angeles Chargers": "LAC", 
    "Los Angeles Rams": "LAR", 
    "Las Vegas Raiders": "LV", 
    "Miami Dolphins": "MIA", 
    "Minnesota Vikings": "MIN", 
    "New England Patriots": "NE", 
    "New Orleans Saints": "NO", 
    "New York Giants":"NYG",
    "New York Jets":"NYJ", 
    "Philadelphia Eagles":"PHI", 
    "Pittsburgh Steelers":"PIT", 
    "Seattle Seahawks":"SEA", 
    "San Francisco 49ers":"SF", 
    "Tampa Bay Buccaneers":"TB", 
    "Tennessee Titans":"TEN", 
    "Washington Commanders":"WSH"
};

const startDatesForWeek = {
    /*
        The dates for each week where predictions can start being made for games being played that week
        E.g. predictions for Week 1, 2025 games can start being made on 8/28/2025

        Current Season: 2025-26
    */ 

    "Hall of Fame Week": new Date("2025-07-24"),
    "Preseason Week 1": new Date("2025-08-02"),
    "Preseason Week 2": new Date("2025-08-12"),
    "Preseason Week 3": new Date("2025-08-20"),
    "Week 1": new Date("2025-08-28"),
    "Week 2": new Date("2025-09-10"),
    "Week 3": new Date("2025-09-17"),
    "Week 4": new Date("2025-09-24"),
    "Week 5": new Date("2025-10-01"),
    "Week 6": new Date("2025-10-08"),
    "Week 7": new Date("2025-10-15"),
    "Week 8": new Date("2025-10-22"),
    "Week 9": new Date("2025-10-29"),
    "Week 10": new Date("2025-11-05"),
    "Week 11": new Date("2025-11-12"),
    "Week 12": new Date("2025-11-19"),
    "Week 13": new Date("2025-11-26"),
    "Week 14": new Date("2025-12-03"),
    "Week 15": new Date("2025-12-10"),
    "Week 16": new Date("2025-12-17"),
    "Week 17": new Date("2025-12-24"),
    "Week 18": new Date("2025-12-31"),
    "Wild Card Round": new Date("2026-01-06"),
    "Divisional Round": new Date("2026-01-14"),
    "Conference Championships": new Date("2026-01-20"),
    "Super Bowl": new Date("2026-01-27"),
};


const PredictTheWinner = () => {
    const currentSeason = "2025"; 
    const today = new Date();
    const [currentPredictionWeek, setCurrentPredictionWeek] = useState(""); 

    const [matchups, setMatchups] = useState([]);
    const [spreads, setSpreads] = useState([]);
    const [overUnders, setOverUnders] = useState([]);

    const [loading, setLoading] = useState(true); 
    const [loadError, throwLoadError] = useState(false); 

    
    async function getCurrentPredictionWeek() {
        // Get the current week where predictions for games that week could start being made
        const currentPredictionWeek = Object.entries(startDatesForWeek)
            .filter(([week, date]) => date <= today)
            .sort((a, b) => b[1] - a[1]);
        return currentPredictionWeek.length > 0 ? currentPredictionWeek[0][0] : "N/A";
    };


    async function updateScheduleDB() {
        // Update the schedule database to ensure that it contains all the matches for the current season
        const csv_result = await fetchUpdateScheduleDB(currentSeason);
        if (csv_result === "Failure updating CSVs") { throwLoadError(true); }
    };


    async function getSpread(gameId) {
        // Get the spread for the given matchup
        try {
            const response = await fetch(
                `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const matchupInfo = await response.json(); 
        
            if (matchupInfo["pickcenter"]) {
                return matchupInfo["pickcenter"][0]["details"]; 
            }

            return "N/A";
            
        } catch (error) {
            console.error("Failed to get the spread for this matchup:", error);
            return "N/A"; 
        }
    }


    async function getOverUnder(gameId) {
        // Get the over/under for the given matchup
        try {
            const response = await fetch(
                `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const matchupInfo = await response.json();

            if (matchupInfo["pickcenter"]) {
                return matchupInfo["pickcenter"][0]["overUnder"]; 
            }

            return "N/A";
            
        } catch (error) {
            console.error("Failed to get the spread for this matchup:", error);
            return "N/A"; 
        }
    }


    function handlePickWinner(team) {
        // Handle the user's prediction for a matchup
        console.log(`User picked: ${team}`);
        // Here you would typically send the prediction to your backend or update the state accordingly
    }

    
    useEffect(() => {
        // Set the current prediction week on mount

        const fetchWeek = async () => {
            const cpw = await getCurrentPredictionWeek();
            setCurrentPredictionWeek(cpw);
        };
        fetchWeek();

    }, []);


    useEffect(() => {
        // Update the schedule database and fetch the matchups for the current prediction week for this season

        if (currentPredictionWeek && currentPredictionWeek !== "N/A") {
            const updateAndFetchMatchups = async () => {
                await updateScheduleDB();

                const matchupData = await fetchScheduleByWeek(currentPredictionWeek);
                setMatchups(matchupData);
            };
            updateAndFetchMatchups();
        }

    }, [currentPredictionWeek]);


    useEffect(() => {
        // Get the spreads and over/unders of each matchup 

        const fetchSpreadsAndOverUnders = async () => {
            if (matchups.length > 0) {
                const newSpreads = [];
                const newOverUnders = [];

                for (const matchup of matchups) {
                    newSpreads[matchup.gameId] = await getSpread(matchup.gameId);
                    newOverUnders[matchup.gameId] = await getOverUnder(matchup.gameId);
                }

                setSpreads(newSpreads);
                setOverUnders(newOverUnders);

                setLoading(false);
            }
        };
        fetchSpreadsAndOverUnders();

    }, [matchups]);

    /*
        In the future, when the spread and over/under finish loading, add another useEffect hook.
        This hook would call the database to check if the user made any predictions (for Scheduled games)
        This hook would determine the result and add/deduct points based on if a prediction was correct or not (for Final games)
    */

    useEffect(() => {
        /**
         * First delete matchups from the previous week in the prediction database
         * Then add matchups of the current week, or update the away/home teams' score, spread, and over/under if it already exists in the DB
         */

        (async () => {
            await deleteOldMatchups(currentPredictionWeek);
            await updateMatchups(matchups, spreads, overUnders);
        })();

    }, [spreads, overUnders]);


    if (loading) {
        return (
            <>
                <div style={{ padding: "20px" }}>
                    <h1>Predict The Winner</h1>
                </div>

                <div>
                    <p style={{ paddingLeft: '20px' }}>
                        Fetching matchups...
                    </p>
                </div>
            </>
        );
    }


    if (loadError) {
        return (
            <>
                <div style={{ padding: "20px" }}>
                    <h1>Predict The Winner</h1>
                </div>

                <div>
                    <p style={{ paddingLeft: '20px' }}>
                        Error, could not fetch matchups.
                    </p>
                </div>
            </>   
        );
    }


    return (
        <>
            <div style={{ padding: "20px" }}>
                <div>
                    <h1>Predict The Winner</h1>
                </div>

                <p>&nbsp;</p>

                <div>
                    <h2>Rules</h2>

                    <div style={boxStyle}>
                        <div style={{ color: 'lightgreen', paddingLeft: '20px' }}>
                            <h4>1. Only games that are being played this week and before its scheduled start time are eligible for prediction.</h4>
                            <h4>2. Predicting winners: You will win 2 points for each correct prediction and lose 2 points for each incorrect prediction. Correctly/Incorrectly predicting a tie will win/lose you 20 points.</h4>
                            <h4>3. Predicting the spread: You will win 4 points for each correct prediction and lose 4 points for each incorrect prediction.</h4>
                            <h4>4. Predicting over/under: You will win 3 points for each correct prediction and lose 3 points for each incorrect prediction.</h4>
                            <h4>5. You will not win/lose any points for any predictions that are not made.</h4>
                            <h4>6. Note that the Spreads and Over/Unders can change over time, so you should ideally wait right before the start of the game to place your picks.</h4>
                            <h4>Pick wisely!</h4>
                        </div>
                    </div>
                </div>

                <p>&nbsp;</p>

                <div style={{ textAlign: 'center' }}>
                    <h2>
                        <div style={{ display: 'inline-block', color: 'aqua' }}>
                            Current Prediction Week: 
                        </div>
                        <div style={{ display: 'inline-block', paddingLeft: '10px', color: '#7ea2efff' }}>
                            {currentPredictionWeek}, {currentSeason}
                        </div>
                    </h2>
                </div>

                <p>&nbsp;</p>

                <div style={{ textAlign: 'center' }}>
                    {/* Show matchups for the current week and give the user an option to pick one team or a tie*/}
                    {matchups.length > 0 ? (
                        <div style={gridStyle}>
                            {matchups.map((matchup, index) => (
                                <div key={index} style={{ margin: '10px 0' }}>
                                    <div>
                                        <div style={{ display: 'inline-block'}}>
                                            <img 
                                                src={teamLogos[matchup.awayTeam]} 
                                                alt={`${matchup.awayTeam} logo`} 
                                                style={logoStyle}
                                            /> 
                                        </div>
                                        
                                        <h4 style={{ display: 'inline-block', paddingLeft: '5px' }}>vs.</h4>
                                        
                                        <div style={{ display: 'inline-block', paddingLeft: '15px' }}>
                                            <img 
                                                src={teamLogos[matchup.homeTeam]} 
                                                alt={`${matchup.homeTeam} logo`} 
                                                style={logoStyle}
                                            /> 
                                        </div> 
                                    </div>

                                    {/* Only give the options to pick a winner, spread, and over/under if the game is Scheduled */}
                                    {/* Display the results if the game is 'Final' */}

                                    <div>
                                        {matchup.status === "Scheduled" ? (
                                            <h4 style={{ color: 'aqua' }}>
                                                Locks {matchup.date} at {matchup.startTime}
                                            </h4>
                                            
                                        ) : matchup.status === "Final" ? (
                                            <div>
                                                <h4 style={{ color: 'lightgreen' }}>
                                                    Results are in!
                                                </h4>
                                            </div>

                                        ) : (
                                            // If the game is 'In Progress', 'Halftime', etc
                                            <h4 style={{ color: '#f4a0a0ff' }}>
                                                Locked
                                            </h4>
                                        )}   
                                    </div>

                                    <div>
                                        <h4>Winner:</h4>
                                        
                                        <div style={{ display: 'inline-block' }}>
                                            <button 
                                                style={buttonStyle}
                                                onClick={() => handlePickWinner(matchup.awayTeam)}>
                                                    {teamAbbr[matchup.awayTeam]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={buttonStyle}
                                                onClick={() => handlePickWinner(matchup.homeTeam)}>
                                                    {teamAbbr[matchup.homeTeam]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={buttonStyle}
                                                onClick={() => handlePickWinner("Tie")}>
                                                    Tie
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4>Spread: {spreads[matchup.gameId] || "Loading..."}</h4>

                                        <div style={{ display: 'inline-block' }}>
                                            <button 
                                                style={buttonStyle}>
                                                    {typeof spreads[matchup.gameId] === 'string'
                                                        ? `-${spreads[matchup.gameId].replace(/^[A-Z]{2,3}\s-?/, '')}`
                                                        : '-'
                                                    }
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={buttonStyle}>
                                                    {typeof spreads[matchup.gameId] === 'string'
                                                        ? `+${spreads[matchup.gameId].replace(/^[A-Z]{2,3}\s-?/, '')}`
                                                        : '-'
                                                    }
                                            </button>
                                        </div>
                                    </div>

                                     <div>
                                        <h4>Over/Under: {overUnders[matchup.gameId] || "Loading..."}</h4>

                                        <div style={{ display: 'inline-block' }}>
                                            <button 
                                                style={buttonStyle}>
                                                    o{overUnders[matchup.gameId]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={buttonStyle}>
                                                    u{overUnders[matchup.gameId]}
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>          
                    ) : (
                        <p>No matchups available for this week.</p>
                    )}
                </div>
                
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    ); 
};

export default PredictTheWinner; 