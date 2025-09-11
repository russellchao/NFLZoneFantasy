import teamAbbr from "../pages/AllTeams/TeamGrid/TeamAbbreviations";
import posAbbr from "../pages/AllPositions/PositionGrid/PositionAbbreviations";


export const fetchPlayerDataByTeam = async (category, teamName) => {
    try {
        const response = await fetch(
           `${process.env.REACT_APP_SPRING_URL}/api/v1/${encodeURIComponent(category)}?team=${encodeURIComponent(teamAbbr[teamName])}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json(); 
        console.log(data); 
        return data; 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
};


export const fetchPlayerDataByPosition = async (positionName) => {
    try {
        let category = ""; 

        if (positionName === "Quarterback") category = "passer";
        else if (positionName === "Running Back") category = "rusher";
        else if (positionName === "Wide Receiver" || positionName === "Tight End") category = "receiver";
        else if (positionName === "Defensive End" || positionName === "Linebacker" || positionName === "Cornerback" || positionName === "Safety") category = "defender";
        else if (positionName === "Kicker") category = "kicker";

        const response = await fetch(
            `${process.env.REACT_APP_SPRING_URL}/api/v1/${encodeURIComponent(category)}?pos=${encodeURIComponent(posAbbr[positionName])}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json(); 
        console.log(data); 
        return data; 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
};


export const fetchPlayerDataByName = async (playerName) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SPRING_URL}/api/v1/playerName?name=${encodeURIComponent(playerName)}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json(); 
        console.log(data); 
        return data; 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
};


export const fetchUpdatePlayerStatsDB = async (teamSeason) => {
    try { 
        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/api/v1/updatePlayerStats?season=${encodeURIComponent(teamSeason)}`);
        console.log("Finished updating player stats database");

        const csv_result = await response.text(); 
        console.log(csv_result);

        // could not fetch player data for the specified season
        if (csv_result === "Failure updating CSVs") {
            console.log("Error fetching player stats");
            return csv_result; 
        } 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
};