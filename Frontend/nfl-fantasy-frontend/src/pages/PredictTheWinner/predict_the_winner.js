import React, {useState, useEffect, useRef} from 'react';
import { fetchScheduleByWeek, fetchUpdateScheduleDB } from '../../API/schedule_api';
import { deleteOldMatchups, updateMatchups, getPredictions, updatePredictedWinner, updatePredictedSpread, updatePredictedOverUnder, updatePointsForPrediction } from '../../API/prediction_api';

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
    background: '#66faf5ff',
    color: '#181289ff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    transition: 'background 0.2s'
};

const buttonStyleCorrect = {
    padding: '5px 12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    background: '#00d636ff',
    color: '#181289ff',
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

const datesForEachWeek = {
    /*
        The dates for each week when predictions can start being made for games being played that week.
        (E.g. predictions for Week 1, 2025 games can start being made on 8/28/2025)

        Current Season: 2025-26
    */ 

    "Hall of Fame Week": new Date("2025-07-24"),
    "Preseason Week 1": new Date("2025-08-02"),
    "Preseason Week 2": new Date("2025-08-14"), 
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
    "Week 18": new Date("2026-01-02"),
    "Wild Card Round": new Date("2026-01-09"),
    "Divisional Round": new Date("2026-01-16"),
    "Conference Championships": new Date("2026-01-24"),
    "Super Bowl": new Date("2026-02-07"),
};


const PredictTheWinner = () => {
    const currentSeason = "2025"; 
    const today = new Date();
    const [currentPredictionWeek, setCurrentPredictionWeek] = useState(""); 
    const [currentPredictions, setCurrentPredictions] = useState([]);

    const [matchups, setMatchups] = useState([]);
    const [spreads, setSpreads] = useState([]);
    const [overUnders, setOverUnders] = useState([]);

    const [loading, setLoading] = useState(true); 
    const [loadError, throwLoadError] = useState(false); 


    useEffect(() => {
        // Automatically refresh the page every 10 minutes

        const interval = setInterval(() => {
            window.location.reload();
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    async function getCurrentPredictionWeek() {
        // Get the current week where predictions for games that week could start being made
        const currentPredictionWeek = Object.entries(datesForEachWeek)
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

    function handlePickWinner(gameId, username, winner, status) {
        // Handle the user's winner prediction for a matchup
        console.log(`User picked for winner: ${winner}`);
        
        if (status === "Scheduled") {
            (async () => {
                await updatePredictedWinner(gameId, username, winner);

                // Update the predictions array so it is reflected in the UI
                const predictions = await getPredictions(localStorage.getItem("username"));
                setCurrentPredictions(predictions);
            })();

        } else {
            console.log("Game already started or finished, cannot make a prediction.");
        }
    }

    function handlePickSpread(gameId, username, spread, status) {
        // Handle the user's prediction for a matchup
        console.log(`User picked for spread: ${spread}`);
        
        if (status === "Scheduled") {
            (async () => {
                await updatePredictedSpread(gameId, username, spread);

                // Update the predictions array so it is reflected in the UI
                const predictions = await getPredictions(localStorage.getItem("username"));
                setCurrentPredictions(predictions);
            })();
            
        } else {
            console.log("Game already started or finished, cannot make a prediction.");
        }
    }

    function handlePickOverUnder(gameId, username, overUnder, status) {
        // Handle the user's prediction for a matchup
        console.log(`User picked for over/under: ${overUnder}`);
        
        if (status === "Scheduled") {
            (async () => {
                await updatePredictedOverUnder(gameId, username, overUnder);

                // Update the predictions array so it is reflected in the UI
                const predictions = await getPredictions(localStorage.getItem("username"));
                setCurrentPredictions(predictions);
            })();

        } else {
            console.log("Game already started or finished, cannot make a prediction.");
        }
    }

    function checkCorrectWinner(prediction) {
        if (prediction.predictedWinner === "N/A") {
            return null; 

        } else if (prediction.predictedWinner === prediction.awayTeam) {
            return prediction.awayTeamScore > prediction.homeTeamScore;

        } else if (prediction.predictedWinner === prediction.homeTeam) {
            return prediction.awayTeamScore < prediction.homeTeamScore;

        } else if (prediction.predictedWinner === "Tie") {
            return prediction.awayTeamScore === prediction.homeTeamScore;
        }
    }

    function checkCorrectSpread(prediction) {
        if (prediction.spreadValue === "EVEN" || prediction.predictedSpread === "N/A" || prediction.spreadValue === undefined) {
            return null; 
        } 

        const spreadTeam = (prediction.spreadValue).replace(/-?\d+(\.\d+)?/, '').trim(); // e.g. "BUF -3.5" => "BUF"
        const spreadNumber =  parseFloat((prediction.spreadValue).replace(/^[A-Z]{2,3}\s-?/, ''));

        console.log(`Spread Team: ${spreadTeam}, Spread Number: ${spreadNumber}`);

        // get the full team name based on the spreadTeam (e.g. BUF becomes Buffalo Bills)
        const favoredTeam = Object.keys(teamAbbr).find(teamName => teamAbbr[teamName] === spreadTeam);

        if (prediction.predictedSpread === 'Minus') {
            /**
             * If the user picked the 'Minus' spread (picked the favored team), the team favored to win must not only win, 
             * but also win by at least the number of points they are favored to win by for the prediction to be correct. 
             */ 

            if (favoredTeam === prediction.awayTeam) {
                return prediction.awayTeamScore - prediction.homeTeamScore >= spreadNumber; 

            } else if (favoredTeam === prediction.homeTeam) {
                return prediction.homeTeamScore - prediction.awayTeamScore >= spreadNumber; 
            }

        } else if (prediction.predictedSpread === 'Plus') {

            /**
             * If the user picked the 'Plus' spread (picked the underdog), a correct prediction falls under 3 conditions:
             * 
             * 1. The underdog wins
             * 2. The favored team wins by less than the number of points they were favored to win by
             * 3. The game ends in a tie
             */

            if (favoredTeam === prediction.awayTeam) {
                return prediction.awayTeamScore - prediction.homeTeamScore < spreadNumber; 

            } else if (favoredTeam === prediction.homeTeam) {
                return prediction.homeTeamScore - prediction.awayTeamScore < spreadNumber; 
            }
        }
    }

    function checkCorrectOverUnder(prediction) {
        if (prediction.predictedOverUnder === "N/A" || prediction.overUnderValue === undefined) {
            return null;

        } else if (prediction.predictedOverUnder === "Over") {
            return prediction.awayTeamScore + prediction.homeTeamScore >= prediction.overUnderValue;

        } else if (prediction.predictedOverUnder === "Under") {
            return prediction.awayTeamScore + prediction.homeTeamScore < prediction.overUnderValue;
        }
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

        if (currentPredictionWeek !== "") {
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


    useEffect(() => {
        /**
         * First delete matchups from the previous week in the prediction database
         * Then add matchups of the current week, or update the away/home teams' score, spread, and over/under if it already exists in the DB
         * Finally, fetch the current user's predictions for the current week
        */

        if (currentPredictionWeek !== "") {
            (async () => {
                await deleteOldMatchups(currentPredictionWeek);
                await updateMatchups(matchups, spreads, overUnders);

                const predictions = await getPredictions(localStorage.getItem("username"));
                setCurrentPredictions(predictions);
            })();
        }

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
                        <div style={{ paddingLeft: '20px' }}>
                            <h4>1. Only games that are being played this week and before its scheduled start time are eligible for prediction.</h4>
                            <h4>2. Predicting winners: You will win 1 point for each correct prediction and lose 1 point for each incorrect prediction. Correctly/Incorrectly predicting a tie will win/lose you 20 points.</h4>
                            <h4>3. Predicting the spread: You will win 3 points for each correct prediction and lose 3 points for each incorrect prediction. If the spread is "EVEN", you will not win or lose any points.</h4>
                            <h4>4. Predicting over/under: You will win 2 points for each correct prediction and lose 2 points for each incorrect prediction.</h4>
                            <h4>5. You will not win/lose any points for any predictions that are not made, or has been originally made but the game has been canceled (rare).</h4>
                            <h4>6. Note that the Spreads and Over/Unders can change over time, so you should ideally wait right before the start of the game to place your picks.</h4>
                            <h4>7. This page automatically refreshes every 10 minutes to ensure the latest matchup information.</h4>
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
                            {matchups.map((matchup, index) => {
                                
                                // Get the array in currentPredictions that is based on the gameId for this matchup
                                const predictionForThisMatchup = currentPredictions.find(pred => pred.gameId === matchup.gameId) || {};

                                // Determine whether the user's predictions were correct/incorrect/NA when the matchup finishes
                                let winnerIsCorrect = null; 
                                let spreadIsCorrect = null;
                                let overUnderIsCorrect = null; 
                                let pointsForThisPrediction = 0; 

                                if (matchup.status === 'Final') {
                                    winnerIsCorrect = checkCorrectWinner(predictionForThisMatchup); 
                                    spreadIsCorrect = checkCorrectSpread(predictionForThisMatchup);
                                    overUnderIsCorrect = checkCorrectOverUnder(predictionForThisMatchup);

                                    // Calculate the number of points earned based on the predictions
                                    if (winnerIsCorrect === true) {
                                        if (predictionForThisMatchup.predictedWinner === "Tie") pointsForThisPrediction += 20; 
                                        else pointsForThisPrediction++; 

                                    } else if (winnerIsCorrect === false) {
                                        if (predictionForThisMatchup.predictedWinner === "Tie") pointsForThisPrediction -= 20; 
                                        else pointsForThisPrediction--; 
                                    }

                                    if (spreadIsCorrect === true) pointsForThisPrediction += 3;
                                    else if (spreadIsCorrect === false) pointsForThisPrediction -= 3;

                                    if (overUnderIsCorrect === true) pointsForThisPrediction += 2;
                                    else if (overUnderIsCorrect === false) pointsForThisPrediction -= 2;

                                    /**
                                     * Add the number of points to the user's current number of points.
                                     * Update the points for the given user in the database, then reflect the change in the navbar
                                     */
                                    updatePointsForPrediction(matchup.gameId, localStorage.getItem("username"), pointsForThisPrediction);
                                    (async () => {
                                        const get_points = await fetch(`http://localhost:8081/api/v1/auth/getPoints?username=${localStorage.getItem("username")}`, {
                                            method: "GET"
                                        });
                                        const points = await get_points.text()

                                        localStorage.setItem("points", points);
                                    })();
                                }

                                return (
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
                                                    Result: {teamAbbr[matchup.awayTeam]} {matchup.awayTeamScore}, {teamAbbr[matchup.homeTeam]} {matchup.homeTeamScore}
                                                </h4>
                                            </div>

                                        ) : (
                                            // If the game is 'In Progress', 'Halftime', etc
                                            <h4 style={{ color: '#f4a0a0ff' }}>
                                                Locked, Game In Progress
                                            </h4>
                                        )}   
                                    </div>

                                    <div>
                                        <h4>Winner:</h4>
                                        
                                        <div style={{ display: 'inline-block' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedWinner === matchup.awayTeam && winnerIsCorrect === false ? buttonStyleWrong 
                                                    : predictionForThisMatchup.predictedWinner === matchup.awayTeam && winnerIsCorrect === true ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedWinner === matchup.awayTeam && winnerIsCorrect === null ? buttonStyleSelected 
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickWinner(matchup.gameId, localStorage.getItem("username"), matchup.awayTeam, matchup.status)}>
                                                    {teamAbbr[matchup.awayTeam]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedWinner === matchup.homeTeam && winnerIsCorrect === false ? buttonStyleWrong 
                                                    : predictionForThisMatchup.predictedWinner === matchup.homeTeam && winnerIsCorrect === true ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedWinner === matchup.homeTeam && winnerIsCorrect === null ? buttonStyleSelected 
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickWinner(matchup.gameId, localStorage.getItem("username"), matchup.homeTeam, matchup.status)}>
                                                    {teamAbbr[matchup.homeTeam]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedWinner === "Tie" && winnerIsCorrect === false ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedWinner === "Tie" && winnerIsCorrect === true ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedWinner === "Tie" && winnerIsCorrect === null ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickWinner(matchup.gameId, localStorage.getItem("username"), "Tie", matchup.status)}>
                                                    Tie
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4>Spread: {spreads[matchup.gameId] || "Loading..."}</h4>

                                        <div style={{ display: 'inline-block' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedSpread === "Minus" && spreadIsCorrect === false ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedSpread === "Minus" && spreadIsCorrect === true ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedSpread === "Minus" && spreadIsCorrect === null ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickSpread(matchup.gameId, localStorage.getItem("username"), "Minus", matchup.status)}>
                                                    {typeof spreads[matchup.gameId] === 'string'
                                                        ? `-${spreads[matchup.gameId].replace(/^[A-Z]{2,3}\s-?/, '')}`
                                                        : '-'
                                                    }
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedSpread === "Plus" && spreadIsCorrect === false ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedSpread === "Plus" && spreadIsCorrect === true ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedSpread === "Plus" && spreadIsCorrect === null ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickSpread(matchup.gameId, localStorage.getItem("username"), "Plus", matchup.status)}>
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
                                                style={
                                                    predictionForThisMatchup.predictedOverUnder === "Over" && overUnderIsCorrect === false? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedOverUnder === "Over" && overUnderIsCorrect === true? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedOverUnder === "Over" && overUnderIsCorrect === null? buttonStyleSelected 
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickOverUnder(matchup.gameId, localStorage.getItem("username"), "Over", matchup.status)}>
                                                    o{overUnders[matchup.gameId]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedOverUnder === "Under" && overUnderIsCorrect === false? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedOverUnder === "Under" && overUnderIsCorrect === true? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedOverUnder === "Under" && overUnderIsCorrect === null? buttonStyleSelected 
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickOverUnder(matchup.gameId, localStorage.getItem("username"), "Under", matchup.status)}>
                                                    u{overUnders[matchup.gameId]}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        {matchup.status === 'Final' && (() => {
                                            return (
                                                <div>
                                                    <div style={{ display: 'inline-block' }}>
                                                        <h4>
                                                            Points for this prediction: 
                                                        </h4>
                                                    </div>
                                                    <div style={{ display: 'inline-block', paddingLeft: '7px' }}>
                                                        {pointsForThisPrediction > 0 ? 
                                                            <h4 style={{ color: 'lightgreen' }}>{pointsForThisPrediction}</h4>
                                                        : pointsForThisPrediction < 0 ? 
                                                            <h4 style={{ color: '#f4a0a0ff' }}>{pointsForThisPrediction}</h4>
                                                        : 
                                                            <h4>{pointsForThisPrediction}</h4>
                                                        }   
                                                    </div>
                                                </div>
                                            );
                                        })()} 
                                    </div>
                                    
                                </div>
                            )})}
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