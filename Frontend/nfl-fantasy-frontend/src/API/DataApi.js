import teamAbbr from "../components/TeamAbbreviations";

// // DEBUG
// for (let key in teamAbbr) {
//     console.log(key + ": " + teamAbbr[key]);
// }

export const fetchPassersByTeam = async (teamName) => {
    try {
        const response = await fetch(
           `http://localhost:8081/api/v1/passer?team=${encodeURIComponent(teamAbbr[teamName])}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json(); 
        console.log(data); // DEBUG
        return data; 

    } catch (error) {
        console.error("Failed to fetch passers:", error);
        return []; 
    }
};