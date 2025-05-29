export const fetchScheduleByTeam = async (teamName) => {
    try {
        const response = await fetch(
           `http://localhost:8081/api/v1/schedule?teamName=${encodeURIComponent(teamName)}`
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




export const fetchScheduleByWeek = async (weekNum) => {

};





export const fetchScheduleByMatchup = async (team1, team2) => {

};




export const fetchUpdateScheduleDB = async (teamSeason) => {
    try { 
        const response = await fetch(`http://localhost:8081/api/v1/updateSchedule?year=${encodeURIComponent(teamSeason)}`);
        console.log("Finished updating schedule database");

        const csv_result = await response.text(); 
        console.log(csv_result);

        // could not fetch player data for the specified season
        if (csv_result === "Failure updating CSVs") {
            console.log("Error fetching schedule");
            return csv_result; 
        } 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
}