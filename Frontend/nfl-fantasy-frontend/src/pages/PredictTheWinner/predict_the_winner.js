import React, {useState, useEffect, useRef} from 'react';
import { fetchScheduleByWeek, fetchUpdateScheduleDB } from '../../API/schedule_api';
import { deleteOldMatchups, updateMatchups, getPredictions, updatePredictedWinner, updatePredictedSpread, updatePredictedOverUnder, markPointsAddedForPrediction, setWinnerIsCorrect, setSpreadIsCorrect, setOverUnderIsCorrect, setNumPoints } from '../../API/prediction_api';
import { createNotification } from '../../API/notification_api';
import { addPoints, getPoints } from '../../API/points_api';

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

    "Hall of Fame Week": new Date("2025-07-24T00:00:00-04:00"),
    "Preseason Week 1": new Date("2025-08-02T00:00:00-04:00"),
    "Preseason Week 2": new Date("2025-08-14T00:00:00-04:00"), 
    "Preseason Week 3": new Date("2025-08-20T00:00:00-04:00"),
    "Week 1": new Date("2025-08-28T00:00:00-04:00"), 
    "Week 2": new Date("2025-09-10T00:00:00-04:00"), 
    "Week 3": new Date("2025-09-17T00:00:00-04:00"),
    "Week 4": new Date("2025-09-24T00:00:00-04:00"),
    "Week 5": new Date("2025-10-01T00:00:00-04:00"),
    "Week 6": new Date("2025-10-08T00:00:00-04:00"),
    "Week 7": new Date("2025-10-15T00:00:00-04:00"),
    "Week 8": new Date("2025-10-22T00:00:00-04:00"),
    "Week 9": new Date("2025-10-29T00:00:00-04:00"),
    "Week 10": new Date("2025-11-05T00:00:00-04:00"), 
    "Week 11": new Date("2025-11-12T00:00:00-04:00"),
    "Week 12": new Date("2025-11-19T00:00:00-04:00"),
    "Week 13": new Date("2025-11-26T00:00:00-04:00"),
    "Week 14": new Date("2025-12-03T00:00:00-04:00"),
    "Week 15": new Date("2025-12-10T00:00:00-04:00"),
    "Week 16": new Date("2025-12-17T00:00:00-04:00"),
    "Week 17": new Date("2025-12-24T00:00:00-04:00"),
    "Week 18": new Date("2026-01-02T00:00:00-04:00"),
    "Wild Card Round": new Date("2026-01-09T00:00:00-04:00"),
    "Divisional Round": new Date("2026-01-16T00:00:00-04:00"),
    "Conference Championships": new Date("2026-01-24T00:00:00-04:00"),
    "Super Bowl": new Date("2026-02-07T00:00:00-04:00"),
};


const PredictTheWinner = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

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
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

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
            return "N/A"; 

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
            return "N/A"; 
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
            return "N/A";

        } else if (prediction.predictedOverUnder === "Over") {
            return prediction.awayTeamScore + prediction.homeTeamScore >= prediction.overUnderValue;

        } else if (prediction.predictedOverUnder === "Under") {
            return prediction.awayTeamScore + prediction.homeTeamScore < prediction.overUnderValue;
        }
    }

    async function awardPointsForPredictions(currentPredictions) {
        let totalPts = 0;

        for (const prediction of currentPredictions) {
            if (prediction.status === 'Final' && prediction.pointsAdded === false) {
                // Determine whether the user's predictions were correct/incorrect/NA when the matchup finishes
                let pointsForThisPrediction = 0;
                const winnerIsCorrect = checkCorrectWinner(prediction);
                const spreadIsCorrect = checkCorrectSpread(prediction);
                const overUnderIsCorrect = checkCorrectOverUnder(prediction);

                // Calculate the number of points earned based on the predictions
                if (winnerIsCorrect === true) {
                    if (prediction.predictedWinner === "Tie") pointsForThisPrediction += 20;
                    else pointsForThisPrediction++; 

                } else if (winnerIsCorrect === false) {
                    if (prediction.predictedWinner === "Tie") pointsForThisPrediction -= 20;
                    else pointsForThisPrediction--;
                }

                if (spreadIsCorrect === true) pointsForThisPrediction++;
                else if (spreadIsCorrect === false) pointsForThisPrediction--;

                if (overUnderIsCorrect === true) pointsForThisPrediction++;
                else if (overUnderIsCorrect === false) pointsForThisPrediction--;

                // Add the points for this prediction to the total prediction points for this week
                totalPts += pointsForThisPrediction; 

                // Mark the flag that the points for a specific prediction has been added to true
                await markPointsAddedForPrediction(prediction.gameId, localStorage.getItem("username"));

                // Mark whether the winner, spread, and over/under for this prediction is correct
                await setWinnerIsCorrect(prediction.gameId, localStorage.getItem("username"), winnerIsCorrect === true ? "Yes" : winnerIsCorrect === false ? "No" : "N/A");
                await setSpreadIsCorrect(prediction.gameId, localStorage.getItem("username"), spreadIsCorrect === true ? "Yes" : spreadIsCorrect === false ? "No" : "N/A");
                await setOverUnderIsCorrect(prediction.gameId, localStorage.getItem("username"), overUnderIsCorrect === true ? "Yes" : overUnderIsCorrect === false ? "No" : "N/A");

                // Mark the number of points that have been added for this prediction (to be reflected in GUI)
                await setNumPoints(prediction.gameId, localStorage.getItem("username"), pointsForThisPrediction);

                // Create a notification that the points have been added if pointsForThisPrediction is not 0
                if (pointsForThisPrediction !== 0) {
                    const notifMessage = `You ${pointsForThisPrediction > 0 ? "earned" : "lost"} ${Math.abs(pointsForThisPrediction)} points for your predictions in the ${prediction.awayTeam} vs. ${prediction.homeTeam} matchup for ${currentPredictionWeek}, ${currentSeason}. (Before: ${localStorage.getItem("points")}, After: ${parseInt(localStorage.getItem("points")) + pointsForThisPrediction})`;
                    await createNotification(localStorage.getItem("username"), notifMessage);
                }
            }
        }

        // Update the number of points the user currently has if necessary
        await addPoints(localStorage.getItem("username"), totalPts);
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
        if (currentPredictionWeek !== "") {
            (async () => {
                // Delete old matchups from the DB and update with new ones when the user opens the page with a new prediction week for the first time
                await deleteOldMatchups(currentPredictionWeek);
                await updateMatchups(matchups, spreads, overUnders);

                // Add points for predictions in case the user opens the page with a finished matchup for the first time
                const predictions = await getPredictions(localStorage.getItem("username"));
                await awardPointsForPredictions(predictions);

                // Fetch the user's predictions again to get the updated points which would then be reflected in the GUI
                const predictionsAfterAddingPoints = await getPredictions(localStorage.getItem("username"));

                /* ONLY KEEPING TEMPORARILY - The matchups array is always in order, but the updateMatchups() function randomizes it */
                // Sort the predictions in the following order: status (Scheduled -> Final -> everything else), date, start time, away team
                predictionsAfterAddingPoints.sort((a, b) => {
                    const statusOrder = { "Scheduled": 0, "Final": 1 };
                    const statusComparison = statusOrder[a.status] - statusOrder[b.status];
                    if (statusComparison !== 0) return statusComparison;

                    const dateComparison = new Date(a.date) - new Date(b.date);
                    if (dateComparison !== 0) return dateComparison;

                    const timeComparison = a.startTime.localeCompare(b.startTime);
                    if (timeComparison !== 0) return timeComparison;

                    return a.awayTeam.localeCompare(b.awayTeam);
                });

                setCurrentPredictions(predictionsAfterAddingPoints);
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
                            <h4>3. Predicting the spread: You will win 1 point for each correct prediction and lose 1 point for each incorrect prediction. If the spread is "EVEN", you will not win or lose any points.</h4>
                            <h4>4. Predicting over/under: You will win 1 point for each correct prediction and lose 1 point for each incorrect prediction.</h4>
                            <h4>5. You will not win/lose any points for any predictions that are not made, or whose spreads and over/unders are unavailable.</h4>
                            <h4>6. Note that the Spreads and Over/Unders can change over time, so you should ideally wait right before the start of the game to place your picks.</h4>
                            <h4>7. This page automatically refreshes every 5 minutes to ensure the latest matchup information.</h4>
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
                    {/* Show predictions for the current week and give the user an option to pick one team or a tie*/}
                    
                    {currentPredictions.length > 0 ? (
                        <div style={gridStyle}>
                            {currentPredictions.map((predictionForThisMatchup, index) => {
                                return (
                                    <div key={index} style={{ margin: '10px 0' }}>
                                        <div>
                                        <div style={{ display: 'inline-block'}}>
                                            <img 
                                                src={teamLogos[predictionForThisMatchup.awayTeam]} 
                                                alt={`${predictionForThisMatchup.awayTeam} logo`} 
                                                style={logoStyle}
                                            /> 
                                        </div>
                                        
                                        <h4 style={{ display: 'inline-block', paddingLeft: '5px' }}>vs.</h4>
                                        
                                        <div style={{ display: 'inline-block', paddingLeft: '15px' }}>
                                            <img 
                                                src={teamLogos[predictionForThisMatchup.homeTeam]} 
                                                alt={`${predictionForThisMatchup.homeTeam} logo`} 
                                                style={logoStyle}
                                            /> 
                                        </div> 
                                    </div>

                                    {/* Only give the options to pick a winner, spread, and over/under if the game is Scheduled */}
                                    {/* Display the results if the game is 'Final' */}

                                    <div>
                                        {predictionForThisMatchup.status === "Scheduled" ? (
                                            <h4 style={{ color: 'aqua' }}>
                                                Locks {predictionForThisMatchup.date} at {predictionForThisMatchup.startTime}
                                            </h4>

                                        ) : predictionForThisMatchup.status === "Final" ? (
                                            <div>
                                                <h4 style={{ color: 'lightgreen' }}>
                                                    Result: {teamAbbr[predictionForThisMatchup.awayTeam]} {predictionForThisMatchup.awayTeamScore}, {teamAbbr[predictionForThisMatchup.homeTeam]} {predictionForThisMatchup.homeTeamScore}
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
                                                    predictionForThisMatchup.predictedWinner === predictionForThisMatchup.awayTeam && predictionForThisMatchup.winnerIsCorrect === "Yes" ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedWinner === predictionForThisMatchup.awayTeam && predictionForThisMatchup.winnerIsCorrect === "No" ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedWinner === predictionForThisMatchup.awayTeam && predictionForThisMatchup.winnerIsCorrect === "N/A" ? buttonStyleSelected 
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickWinner(predictionForThisMatchup.gameId, localStorage.getItem("username"), predictionForThisMatchup.awayTeam, predictionForThisMatchup.status)}>
                                                    {teamAbbr[predictionForThisMatchup.awayTeam]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedWinner === predictionForThisMatchup.homeTeam && predictionForThisMatchup.winnerIsCorrect === "Yes" ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedWinner === predictionForThisMatchup.homeTeam && predictionForThisMatchup.winnerIsCorrect === "No" ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedWinner === predictionForThisMatchup.homeTeam && predictionForThisMatchup.winnerIsCorrect === "N/A" ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickWinner(predictionForThisMatchup.gameId, localStorage.getItem("username"), predictionForThisMatchup.homeTeam, predictionForThisMatchup.status)}>
                                                    {teamAbbr[predictionForThisMatchup.homeTeam]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedWinner === "Tie" && predictionForThisMatchup.winnerIsCorrect === "Yes" ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedWinner === "Tie" && predictionForThisMatchup.winnerIsCorrect === "No" ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedWinner === "Tie" && predictionForThisMatchup.winnerIsCorrect === "N/A" ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickWinner(predictionForThisMatchup.gameId, localStorage.getItem("username"), "Tie", predictionForThisMatchup.status)}>
                                                    Tie
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4>Spread: {spreads[predictionForThisMatchup.gameId] || "Loading..."}</h4>

                                        <div style={{ display: 'inline-block' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedSpread === "Minus" && predictionForThisMatchup.spreadIsCorrect === "Yes" ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedSpread === "Minus" && predictionForThisMatchup.spreadIsCorrect === "No" ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedSpread === "Minus" && predictionForThisMatchup.spreadIsCorrect === "N/A" ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickSpread(predictionForThisMatchup.gameId, localStorage.getItem("username"), "Minus", predictionForThisMatchup.status)}>
                                                    {typeof spreads[predictionForThisMatchup.gameId] === 'string'
                                                        ? `-${spreads[predictionForThisMatchup.gameId].replace(/^[A-Z]{2,3}\s-?/, '')}`
                                                        : '-'
                                                    }
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedSpread === "Plus" && predictionForThisMatchup.spreadIsCorrect === "Yes" ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedSpread === "Plus" && predictionForThisMatchup.spreadIsCorrect === "No" ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedSpread === "Plus" && predictionForThisMatchup.spreadIsCorrect === "N/A" ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickSpread(predictionForThisMatchup.gameId, localStorage.getItem("username"), "Plus", predictionForThisMatchup.status)}>
                                                    {typeof spreads[predictionForThisMatchup.gameId] === 'string'
                                                        ? `+${spreads[predictionForThisMatchup.gameId].replace(/^[A-Z]{2,3}\s-?/, '')}`
                                                        : '-'
                                                    }
                                            </button>
                                        </div>
                                    </div>

                                     <div>
                                        <h4>Over/Under: {overUnders[predictionForThisMatchup.gameId] || "Loading..."}</h4>

                                        <div style={{ display: 'inline-block' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedOverUnder === "Over" && predictionForThisMatchup.overUnderIsCorrect === "Yes" ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedOverUnder === "Over" && predictionForThisMatchup.overUnderIsCorrect === "No" ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedOverUnder === "Over" && predictionForThisMatchup.overUnderIsCorrect === "N/A" ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickOverUnder(predictionForThisMatchup.gameId, localStorage.getItem("username"), "Over", predictionForThisMatchup.status)}>
                                                    o{overUnders[predictionForThisMatchup.gameId]}
                                            </button>
                                        </div>
                                        <div style={{ display: 'inline-block', paddingLeft: '5px' }}>
                                            <button 
                                                style={
                                                    predictionForThisMatchup.predictedOverUnder === "Under" && predictionForThisMatchup.overUnderIsCorrect === "Yes" ? buttonStyleCorrect
                                                    : predictionForThisMatchup.predictedOverUnder === "Under" && predictionForThisMatchup.overUnderIsCorrect === "No" ? buttonStyleWrong
                                                    : predictionForThisMatchup.predictedOverUnder === "Under" && predictionForThisMatchup.overUnderIsCorrect === "N/A" ? buttonStyleSelected
                                                    : buttonStyle
                                                }
                                                onClick={() => handlePickOverUnder(predictionForThisMatchup.gameId, localStorage.getItem("username"), "Under", predictionForThisMatchup.status)}>
                                                    u{overUnders[predictionForThisMatchup.gameId]}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        {predictionForThisMatchup.status === 'Final' && (() => {
                                            return (
                                                <div>
                                                    <div style={{ display: 'inline-block' }}>
                                                        <h4>
                                                            Points for this prediction: 
                                                        </h4>
                                                    </div>
                                                    <div style={{ display: 'inline-block', paddingLeft: '7px' }}>
                                                        {predictionForThisMatchup.numPoints > 0 ? 
                                                            <h4 style={{ color: 'lightgreen' }}>{predictionForThisMatchup.numPoints}</h4>
                                                        : predictionForThisMatchup.numPoints < 0 ? 
                                                            <h4 style={{ color: '#f4a0a0ff' }}>{predictionForThisMatchup.numPoints}</h4>
                                                        : 
                                                            <h4>{predictionForThisMatchup.numPoints}</h4>
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