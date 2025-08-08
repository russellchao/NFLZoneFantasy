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
                week: matchup.weekNum
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

    const response = await fetch(`http://localhost:8081/api/v1/predictions/deleteOldMatchups?currentWeek=${currentPredictionWeek}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        console.error("Failed to delete matchups in prediction database:", response.statusText);
    }
};

