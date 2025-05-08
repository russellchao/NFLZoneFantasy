import teamAbbr from "../components/TeamAbbreviations";

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