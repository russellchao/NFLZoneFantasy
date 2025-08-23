export const updateMatchups = async (matchups, spreads, overUnders) => {
    /**
    * Adds new matchups (based on gameID and username)
    * or updates the away & home score, spread, and over/under for existing matchups in the prediction database.
    */

    for (const matchup of matchups) {
        const response = await fetch("http://localhost:8081/api/v1/predictions/updateMatchups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gameId: matchup.gameId,
                username: localStorage.getItem("username"),
                awayTeam: matchup.awayTeam,
                awayTeamScore: matchup.awayTeamScore,
                homeTeam: matchup.homeTeam,
                homeTeamScore: matchup.homeTeamScore,
                spreadValue: spreads[matchup.gameId],
                overUnderValue: overUnders[matchup.gameId],
                pointsAdded: false,
                week: matchup.weekNum,
                winnerIsCorrect: "N/A",
                spreadIsCorrect: "N/A",
                overUnderIsCorrect: "N/A",
                numPoints: 0,
                predictionId: `${matchup.gameId}-${localStorage.getItem("username")}`,
                status: matchup.status,
                date: matchup.date,
                startTime: matchup.startTime
            })
        });

        if (!response.ok) {
            console.error("Failed to update matchups in prediction database:", response.statusText);
        }
    }
};

export const deleteOldMatchups = async (currentPredictionWeek) => {
    /**
     * Deletes all matchups in the prediction database whose week isn't the same as the current prediction week 
     * E.g. delete a matchup from week 1 when the current prediction week is week 2
     * Basically deletes all matchups from the previous week
    */ 

    console.log(`Deleting old matchups for week: ${currentPredictionWeek}`)

    const response = await fetch(`http://localhost:8081/api/v1/predictions/deleteOldMatchups?currentWeek=${currentPredictionWeek}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        console.error("Failed to delete matchups in prediction database:", response.statusText);
    }
};

export const getPredictions = async (username) => {

    console.log(`Getting predictions for username: ${username}`)

    const response = await fetch(`http://localhost:8081/api/v1/predictions/getPredictions?username=${username}`, {
        method: "GET"
    });

    if (!response.ok) {
        console.error("Failed to get predictions from prediction database:", response.statusText);
    }

    const data = await response.json();
    console.log(data); 

    return data;
}; 

export const updatePredictedWinner = async (gameId, username, winner) => {

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/updatePredictedWinner?gameId=${gameId}&username=${username}&winner=${winner}`, 
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.error("Failed to update predicted winner:", response.statusText);
    }
};

export const updatePredictedSpread = async (gameId, username, spread) => {

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/updatePredictedSpread?gameId=${gameId}&username=${username}&spread=${spread}`, 
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.error("Failed to update predicted spread:", response.statusText);
    }
};

export const updatePredictedOverUnder = async (gameId, username, overUnder) => {

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/updatePredictedOverUnder?gameId=${gameId}&username=${username}&overUnder=${overUnder}`, 
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.error("Failed to update predicted over/under:", response.statusText);
    }
};

export const markPointsAddedForPrediction = async (gameId, username) => {

    console.log(`Marking flag that the points for: Game ID: ${gameId}, Username: ${username}, have been added`);

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/setPointsAdded?gameId=${gameId}&username=${username}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.error("Failed to mark points added for prediction:", response.statusText);
    }
};

export const setWinnerIsCorrect = async (gameId, username, isCorrect) => {
    console.log(`Setting winner is correct for Game ID: ${gameId}, Username: ${username}, Is Correct: ${isCorrect}`);

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/setWinnerIsCorrect?gameId=${gameId}&username=${username}&isCorrect=${isCorrect}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

    if (!response.ok) {
        console.error("Failed to set winner is correct:", response.statusText);
    }
};

export const setSpreadIsCorrect = async (gameId, username, isCorrect) => {
    console.log(`Setting spread is correct for Game ID: ${gameId}, Username: ${username}, Is Correct: ${isCorrect}`);

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/setSpreadIsCorrect?gameId=${gameId}&username=${username}&isCorrect=${isCorrect}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

    if (!response.ok) {
        console.error("Failed to set spread is correct:", response.statusText);
    }
};

export const setOverUnderIsCorrect = async (gameId, username, isCorrect) => {
    console.log(`Setting over/under is correct for Game ID: ${gameId}, Username: ${username}, Is Correct: ${isCorrect}`);

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/setOverUnderIsCorrect?gameId=${gameId}&username=${username}&isCorrect=${isCorrect}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

    if (!response.ok) {
        console.error("Failed to set over/under is correct:", response.statusText);
    }
};

export const setNumPoints = async (gameId, username, numPoints) => {
    console.log(`Setting numPoints for Game ID: ${gameId}, Username: ${username}, Num Points: ${numPoints}`);

    const response = await fetch(
        `http://localhost:8081/api/v1/predictions/setNumPoints?gameId=${gameId}&username=${username}&numPoints=${numPoints}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

    if (!response.ok) {
        console.error("Failed to set numPoints:", response.statusText);
    }
};
