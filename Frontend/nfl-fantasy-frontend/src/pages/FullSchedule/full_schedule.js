import React, {useEffect, useState} from 'react';
import { fetchScheduleByWeek, fetchUpdateScheduleDB } from '../../API/schedule_api';
import GameFinal from '../Components/Schedule/game_final';
import GameScheduled from '../Components/Schedule/game_scheduled';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';
import WeekDropdownMenu from '../Components/WeekDropdown/week_dropdown';


const FullSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [teamSeason, setSeason] = useState("2025"); 
    const [matchups, setMatchups] = useState([]); // matchyups for the selected week
    const [week, setWeek] = useState("1");
    const [loading, setLoading] = useState(true); 
    const [loadError, throwLoadError] = useState(false); // Error state for loading data


    // Update the schedule database to retrieve the latest schedule data
    async function updateScheduleDB() {
        if (!loading) {
            setLoading(true); 
        }

        // In case updating the schedule CSV is unsuccessful, the function will return such a response
        const csv_result = await fetchUpdateScheduleDB(teamSeason); 

        if (csv_result === "Failure updating CSVs") { throwLoadError(true); }
    };



    useEffect(() => {
        // Fetch the full schedule for the selected season

        (async () => {
            await updateScheduleDB(); 

            console.log(`Retreiving schedule from ${teamSeason}`);

            const schedule_data = await fetchScheduleByWeek(week); 
            setSchedule(schedule_data);

            setLoading(false);

            console.log(schedule);
        })();

    }, [teamSeason]);




    useEffect(() => {
        // Get the matchups for the selected week

        console.log(`Changed week to ${week}`);

        (async () => {  
            const schedule_data = await fetchScheduleByWeek(week); 
            setSchedule(schedule_data);

            setLoading(false);

        })(); 

    }, [week]);


    

    useEffect(() => {
        // Log the updated schedule whenever it changes
        console.log('Updated schedule:', schedule);
    }, [schedule]);




    return (
        <div>
            <h1 style={{ paddingLeft:'20px' }}>Full Schedule</h1>

            {/* Season selection drop-down menu */}
            <SeasonDropdownMenu
                teamSeason = {teamSeason}
                onChange = {setSeason}
            />

            {/* Week selection dropdown menu */}
            <WeekDropdownMenu
                week = {week}
                onChange = {setWeek}
            />
            
            
            <p>&nbsp;</p>


        </div>
    ); 

};


export default FullSchedule;