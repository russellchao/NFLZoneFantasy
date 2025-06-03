import React, {useEffect, useState} from 'react';
import { fetchScheduleByWeek, fetchUpdateScheduleDB } from '../../API/schedule_api';
import GameFinal from '../Components/Schedule/game_final';
import GameScheduled from '../Components/Schedule/game_scheduled';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';
import WeekDropdownMenu from '../Components/WeekDropdown/week_dropdown';


const FullSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [teamSeason, setSeason] = useState("2025"); 
    const [week, setWeek] = useState("Week 1");
    const [loading, setLoading] = useState(true); 
    const [loadError, throwLoadError] = useState(false); // Error state for loading data
    const [datesThisWeek, setDatesThisWeek] = useState([]); // Dates for the selected week
    const [firstTimeLoad, setFirstTimeLoad] = useState(true); 


    // Update the schedule database to retrieve the latest schedule data
    async function updateScheduleDB() {
        if (!loading) {
            setLoading(true); 
        }

        console.log(`Database Loading: ${loading}`);

        // In case updating the schedule CSV is unsuccessful, the function will return such a response
        const csv_result = await fetchUpdateScheduleDB(teamSeason); 

        if (csv_result === "Failure updating CSVs") { throwLoadError(true); }
    };



    useEffect(() => {
        // Fetch the full schedule for the selected season
        throwLoadError(false);

        (async () => {
            await updateScheduleDB(); 

            console.log(`Retreiving schedule from ${teamSeason}`);

            const schedule_data = await fetchScheduleByWeek(week); 
            setSchedule(schedule_data);

            setLoading(false);

            console.log(schedule);

            console.log(`First time load 1: ${firstTimeLoad}`); // DEBUG
        })();

    }, [teamSeason]);




    useEffect(() => {
        console.log(`First time load 2: ${firstTimeLoad}`);  // DEBUG

        if (!firstTimeLoad) {
            // Get the matchups for the selected week
            throwLoadError(false);

            console.log(`Changed week to ${week}`);

            (async () => {  
                const schedule_data = await fetchScheduleByWeek(week); 
                setSchedule(schedule_data);
            })(); 
        } else {
            // Set the first time load variable to false after the first load to prevent resetting the schedule
            setFirstTimeLoad(false);
        }

    }, [week]);



    useEffect(() => {
        // Log the updated schedule whenever it changes
        console.log('Updated schedule:', schedule);

        // Set the dates for the selected week
        const newDatesThisWeek = [];
        for (let i = 0; i < schedule.length; i++) {
            const game = schedule[i];
            if (game.date && !newDatesThisWeek.includes(game.date)) {
                newDatesThisWeek.push(game.date);
            }
        }

        setDatesThisWeek(newDatesThisWeek); 

        console.log('Updated dates:', datesThisWeek);

    }, [schedule]);



    // When the page is loading schedule data
    if (loading) {
        return (
            <p style={{ paddingLeft: '20px' }}>Loading the {teamSeason} NFL schedule...</p>
        );
    }



    // When the schedule data could not be loaded
    if (loadError) {
        return (
            <div>
                <p style={{ paddingLeft: '20px' }}>
                    Error, could not load the schedule for the {teamSeason} season.
                </p>

                {/* Season section drop-down menu */}
                <SeasonDropdownMenu
                    teamSeason = {teamSeason}
                    onChange = {setSeason}
                />
            </div>
        );
    }



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

            {/* Display all matchups for each date in the selected week */}
            <div style={{ paddingLeft: '20px' }}>
                {datesThisWeek.map((date, idx) => (
                    <div key={idx}>
                        <h2>{date}</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            {schedule.filter(game => game.date === date).map((game, gameIdx) => (
                                game.status === 'Final' ? (
                                    <GameFinal key={game.gameId || gameIdx} game={game} />
                                ) : game.status === 'Scheduled' ? (
                                    <GameScheduled key={game.gameId || gameIdx} game={game} />
                                ) : (
                                    <></>
                                )
                            ))}
                        </div>
                    </div>
                ))}       
            </div>

            <p>&nbsp;</p>

            {/* Display each team's bye weeks (can hard-code since all bye weeks are finalized) */}
            {teamSeason === "2025" ? (
                <div style={{ paddingLeft: '20px' }}>
                    <h2>2025 Bye Weeks</h2>
                    <p>Week 5: PIT, CHI, ATL, GB</p>
                    <p>Week 6: HOU, MIN</p>
                    <p>Week 7: BAL, BUF</p>
                    <p>Week 8: ARZ, JAX, DET, LV, SEA, LAR</p>
                    <p>Week 9: PHI, CLE, NYJ, TB</p>
                    <p>Week 10: KC, CIN, TEN, DAL</p>
                    <p>Week 11: IND, NO</p>
                    <p>Week 12: MIA, DEN, LAC, WAS</p>
                    <p>Week 14: NYG, NE, CAR, SF</p>
                </div>
            ) : (
                <></>
            )}

            <p>&nbsp;</p>
            <p>&nbsp;</p>
            


        </div>
    ); 

};


export default FullSchedule;