import React, {useRef, useEffect, useState} from 'react';
import { fetchScheduleByWeek, fetchUpdateScheduleDB } from '../../API/schedule_api';
import GameFinal from '../Components/Schedule/game_final';
import GameScheduled from '../Components/Schedule/game_scheduled';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';
import WeekDropdownMenu from '../Components/WeekDropdown/week_dropdown';
import TeamDropdownMenu from '../Components/TeamDropdown/team_dropdown';


const FullSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [teamSeason, setSeason] = useState("2025"); 
    const [week, setWeek] = useState("Week 1");
    const [loading, setLoading] = useState(true); 
    const [loadError, throwLoadError] = useState(false); // Error state for loading data
    const [datesThisWeek, setDatesThisWeek] = useState([]); // Dates for the selected week
    
    // Variables for finding specific matchups
    const [specificTeam1, setSpecificTeam1] = useState("");
    const [specificTeam2, setSpecificTeam2] = useState("");
    const [submitSpecificMatchup, setSubmitSpecificMatchup] = useState(false); 

    // Track if initial fetch has been done
    const initialFetchRef = useRef(false);


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
        if (initialFetchRef.current) {
            return; // Skip if we've already done the initial fetch
        } else {
            initialFetchRef.current = true; // Mark that we've done the initial fetch
        }

        // Fetch the full schedule for the selected season
        throwLoadError(false);

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
        // Skip week changes during initial load
        if (!initialFetchRef.current) {
            return;
        }

        // Get the matchups for the selected week
        throwLoadError(false);

        console.log(`Changed week to ${week}`);

        (async () => {  
            const schedule_data = await fetchScheduleByWeek(week); 
            setSchedule(schedule_data);
        })(); 
        

    }, [week]);


    useEffect(() => {
        // Skip date changes during initial load (NOTE: ALWAYS USE THIS CHECK IN EVERY useEffect HOOK THAT'S NOT THE FIRST ONE)
        if (!initialFetchRef.current) {
            return;
        }

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



    useEffect(() => {
        // This useEffect is triggered when the user submits a specific matchup

        if (!initialFetchRef.current) {
            return;
        }

        // Check if the user selects two teams for a specific matchup
        if (!submitSpecificMatchup) {
            if (specificTeam1 !== "" && specificTeam2 !== "" && specificTeam1 !== specificTeam2) {
                setSubmitSpecificMatchup(true); 
            }; 
        }; 

        // Check if the user wants to go back to the full schedule
        if (submitSpecificMatchup) {
            if (specificTeam1 === "" || specificTeam2 === "") {
                setSubmitSpecificMatchup(false); 
            };
        }

    }, [specificTeam1, specificTeam2]); 






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

                {/* Season section drop-down menu (re-fetch schedule data if changed) */}
                <SeasonDropdownMenu
                    teamSeason = {teamSeason}
                    onChange={(newSeason) => {
                        setSeason(newSeason);
                        initialFetchRef.current = false;
                    }}
                />
            </div>
        );
    }


    // When the user submitted a specific matchup
    if (submitSpecificMatchup) {
        return (
            <>
                <div>
                    <br></br>

                    {/* Button to go back to the full schedule */}
                    <button style={{ marginLeft: '20px' }}>
                        <a 
                            style={{ textDecoration: 'none', color: 'black' }}
                            onClick={() => {
                                setSpecificTeam1("");
                                setSpecificTeam2("");
                                setSubmitSpecificMatchup.bind(null, false);
                            }}
                        >   
                            Back to Full Schedule
                        </a>
                    </button>
                </div>

                <div>
                    <br></br>

                    {/* Season selection drop-down menu (re-fetch schedule data if changed) */}
                    <SeasonDropdownMenu
                        teamSeason = {teamSeason}
                        onChange={(newSeason) => {
                            setSeason(newSeason);
                            initialFetchRef.current = false;
                        }}
                    />

                    {/* Specific matchup finder option */}
                    <span style={{ marginLeft: '200px' }}>Find a matchup: </span>
                    <TeamDropdownMenu
                        team = {specificTeam1}
                        onChange = {setSpecificTeam1}
                    ></TeamDropdownMenu>
                    <span style={{ marginLeft: '25px' }}>vs.</span>
                    <TeamDropdownMenu
                        team = {specificTeam2}
                        onChange = {setSpecificTeam2}
                    ></TeamDropdownMenu>

                    <h2 style={{ paddingLeft: '20px' }}>
                        Matchups for {specificTeam1} vs. {specificTeam2} in the {teamSeason} season
                    </h2>
                </div>
            </>
        );
    }



    return (
        <div>
            <h1 style={{ paddingLeft:'20px' }}>Full Schedule</h1>

            {/* Season selection drop-down menu (re-fetch schedule data if changed) */}
            <SeasonDropdownMenu
                teamSeason = {teamSeason}
                onChange={(newSeason) => {
                    setSeason(newSeason);
                    initialFetchRef.current = false;
                }}
            />

            {/* Week selection dropdown menu */}
            <WeekDropdownMenu
                week = {week}
                onChange = {setWeek}
            />

            {/* Specific matchup finder option */}
            <span style={{ marginLeft: '200px' }}>Find a matchup: </span>
            <TeamDropdownMenu
                team = {specificTeam1}
                onChange = {setSpecificTeam1}
            ></TeamDropdownMenu>
            <span style={{ marginLeft: '25px' }}>vs.</span>
            <TeamDropdownMenu
                team = {specificTeam2}
                onChange = {setSpecificTeam2}
            ></TeamDropdownMenu>
            
            
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
            ) : teamSeason === "2022" && week === "Week 17" ?  (
                // If viewing the 2022 schedule, indicate the cancelled Bills vs. Bengals game
                <p style={{ paddingLeft: '20px' }}>The Buffalo Bills vs. Cincinnati Bengals week 17 game was cancelled due to a medical emergency involving Bills Safety Damar Hamlin.</p>
            ) : (
                <></>
            )}

            <p>&nbsp;</p>
            <p>&nbsp;</p>
            


        </div>
    ); 

};


export default FullSchedule;