import teamAbbr from "../components/TeamAbbreviations";
import posAbbr from "../components/PositionAbbreviations";


export const fetchDataByTeam = async (category, teamName) => {
    try {
        const response = await fetch(
           `http://localhost:8081/api/v1/${encodeURIComponent(category)}?team=${encodeURIComponent(teamAbbr[teamName])}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json(); 
        return data; 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
};


export const fetchDataByPosition = async (positionName) => {
    try {
        let category = ""; 

        if (positionName === "Quarterback") category = "passer";
        else if (positionName === "Running Back") category = "rusher";
        else if (positionName === "Wide Receiver" || positionName === "Tight End") category = "receiver";
        else if (positionName === "Linebacker" || positionName === "Defensive Back") category = "defender";
        else if (positionName === "Kicker") category = "kicker";

        const response = await fetch(
            `http://localhost:8081/api/v1/${encodeURIComponent(category)}?pos=${encodeURIComponent(posAbbr[positionName])}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json(); 
        console.log(data); // DEBUG
        return data; 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
};