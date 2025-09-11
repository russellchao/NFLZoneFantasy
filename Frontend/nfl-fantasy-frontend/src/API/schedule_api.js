export const fetchScheduleByTeam = async (teamName) => {
    try {
        const response = await fetch(
           `${process.env.SPRING_URL}/api/v1/schedule?teamName=${encodeURIComponent(teamName)}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json(); 

        /*
            If fetching schedule by team, we need to sort the matchup dates by week,
            because the requests (in Flask App) for retrieving preseason, regular season, and playoff games are parallelized, 
            so the matchup dates in the database by default aren't sorted by week for a specific team.
        */

        const week_order = [
            "Hall of Fame Week", "Preseason Week 1", "Preseason Week 2", "Preseason Week 3",
            "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", 
            "Week 10", "Week 11", "Week 12", "Week 13", "Week 14", "Week 15", "Week 16", "Week 17", "Week 18", 
            "Wild Card Round", "Divisional Round", "Conference Championships", "Super Bowl"
        ]

        // Sort the data by the weekNum attribute according to the week_order
        data.sort((a, b) => {
            const weekA = week_order.indexOf(a.weekNum);
            const weekB = week_order.indexOf(b.weekNum);
            return weekA - weekB;
        });

        console.log(data); 

        return data; 

    } catch (error) {
        console.error("Failed to fetch data:", error);
        return []; 
    }
};


export const fetchScheduleByWeek = async (weekNum) => {
    try {
        const response = await fetch(
            `${process.env.SPRING_URL}/api/v1/schedule?weekNum=${encodeURIComponent(weekNum)}`
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


export const fetchScheduleByMatchup = async (team1, team2) => {
    try {
        const response = await fetch(
            `${process.env.SPRING_URL}/api/v1/schedule/specific?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`
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


export const fetchUpdateScheduleDB = async (teamSeason) => {
    try { 
        const response = await fetch(`${process.env.SPRING_URL}/api/v1/updateSchedule?year=${encodeURIComponent(teamSeason)}`);
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