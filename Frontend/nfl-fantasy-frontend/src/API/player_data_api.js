import teamAbbr from "../pages/AllTeams/TeamGrid/TeamAbbreviations";
import posAbbr from "../pages/AllPositions/PositionGrid/PositionAbbreviations";


export const fetchDataByTeam = async (category, teamName, season) => {
    try {
        // Fetch the Python Flask App to update each CSV file containing player data
        fetch(`http://localhost:5000/playerData/${encodeURIComponent(season)}`);

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }

    try {
        
        // Fetch the Spring Boot Backend containing the updated player data in PostgresSQL 
        const response = await fetch(
           `http://localhost:8081/api/v1/${encodeURIComponent(category)}?team=${encodeURIComponent(teamAbbr[teamName])}`
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


export const fetchDataByPosition = async (positionName, season) => {
    try {
        fetch(`http://localhost:5000/playerData/${encodeURIComponent(season)}`);
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }

    try {
        let category = ""; 

        if (positionName === "Quarterback") category = "passer";
        else if (positionName === "Running Back") category = "rusher";
        else if (positionName === "Wide Receiver" || positionName === "Tight End") category = "receiver";
        else if (positionName === "Defensive End" || positionName === "Linebacker" || positionName === "Cornerback" || positionName === "Safety") category = "defender";
        else if (positionName === "Kicker") category = "kicker";

        const response = await fetch(
            `http://localhost:8081/api/v1/${encodeURIComponent(category)}?pos=${encodeURIComponent(posAbbr[positionName])}`
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


export const fetchDataByName = async (playerName) => {
    try {

        const response = await fetch(
            `http://localhost:8081/api/v1?name=${encodeURIComponent(playerName)}`
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