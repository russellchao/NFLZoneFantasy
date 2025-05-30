import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayerDataByTeam, fetchUpdatePlayerStatsDB } from '../../API/player_data_api';
import { fetchScheduleByTeam, fetchUpdateScheduleDB } from '../../API/schedule_api';
import Schedule from './Schedule/tp_schedule';
import PlayerStats from './PlayerStats/tp_player_stats';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';


const TeamPage = () => {
    const { teamName } = useParams(); 
    const [section, setSection] = useState("Player Stats"); 
    const allSections = ["Schedule", "Player Stats", "Roster"];
    const [teamSeason, setSeason] = useState("2024"); 
    const [loading, setLoading] = useState(true);
    const [loadError, throwLoadError] = useState(false); 


    // For schedule section
    const [week, setWeek] = useState("1")
    const [schedule, setSchedule] = useState([]); 


    // For player stats section
    const [passers, setPassers] = useState([]); 
    const [rushers, setRushers] = useState([]); 
    const [receivers, setReceivers] = useState([]); 
    const [defenders, setDefenders] = useState([]); 
    const [kickers, setKickers] = useState([]); 
     
  
    // For roster section



    // Section switch
    const handleSectionChange = (section) => {
        setSection(section); 
    };


    // Call the Specialized Spring Boot endpoint to update the specified CSV and database table
    async function updatePlayerStatsDB() {
        if (!loading) {
            setLoading(true); 
        }

        // In case updating the player stats CSV is unsuccessful, the function will return such a response
        const csv_result = await fetchUpdatePlayerStatsDB(teamSeason); 

        if (csv_result === "Failure updating CSVs") { throwLoadError(true); }
    };

    async function updateScheduleDB() {
        if (!loading) {
            setLoading(true); 
        }

        // In case updating the schedule CSV is unsuccessful, the function will return such a response
        const csv_result = await fetchUpdateScheduleDB(teamSeason); 

        if (csv_result === "Failure updating CSVs") { throwLoadError(true); }
    };








    useEffect(() => {
        throwLoadError(false); // reset loadError to false on each load



        // Update the section based on the based on the current path
        if (section === "Schedule") {
            (async () => {
                /*** 
                 * Placing this logic on an async wrapper allows us to wait for the database 
                 * to completely update before fetching the data
                 * */ 
                await updateScheduleDB(); 
                console.log(`Retreiving schedule from ${teamSeason}`);

                // Retrieve schedule from the Spring Boot Backend (for schedule section)
                if (teamName) {
                    const loadSchedule = async () => {
                        const scheduleData = await fetchScheduleByTeam(teamName); 
                        setSchedule(scheduleData); 
                    }
                    loadSchedule();

                    setLoading(false); 

                    console.log(schedule);
                };
            })();


        } else if (section === "Player Stats") {
            (async () => { 
                await updatePlayerStatsDB(); 
                console.log(`Retreiving player stats from ${teamSeason}`)

                // Retrieve player data from the Spring Boot Backend (for player stats section)
                if (teamName) {
                    // Fetch Passing data
                    const loadPassers = async () => {
                        const passingData = await fetchPlayerDataByTeam("passer", teamName); 
                        setPassers(passingData); 
                    };
                    loadPassers(); 

                    // Fetch Rushing data
                    const loadRushers = async () => {
                        const rushingData = await fetchPlayerDataByTeam("rusher", teamName); 
                        setRushers(rushingData); 
                    };
                    loadRushers(); 

                    // Fetch Receiving data
                    const loadReceivers = async () => {
                        const receivingData = await fetchPlayerDataByTeam("receiver", teamName); 
                        setReceivers(receivingData); 
                    };
                    loadReceivers(); 

                    // Fetch Defense data
                    const loadDefenders = async () => {
                        const defenseData = await fetchPlayerDataByTeam("defender", teamName); 
                        setDefenders(defenseData); 
                    };
                    loadDefenders(); 

                    // Fetch Kicking data
                    const loadKickers = async () => {
                        const kickingData = await fetchPlayerDataByTeam("kicker", teamName); 
                        setKickers(kickingData); 
                    };
                    loadKickers(); 


                    setLoading(false); 
                };
            })(); 
        };

    }, [teamName, teamSeason, section]);


    // When the page is loading data
    if (loading) {
        return (
            <p style={{ paddingLeft: '20px' }}>Loading the {teamSeason} {section} for the {teamName}...</p>
        );
    }


    console.log("Load error: ", loadError);


    // When the player stats cannot be fetched
    if (loadError) {
        return (
            <div>
                <p style={{ paddingLeft: '20px' }}>
                    Error, could not load {section} for the {teamName}' {teamSeason} season.
                </p>

                {/* Menu for each section */}
                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    padding: '20px',
                    width: '75%'
                }}>
                    {allSections.map(thisSection => (
                        <div key={thisSection}
                            onClick={() => handleSectionChange(thisSection)}
                            style={{
                                padding: '10px',
                                backgroundColor: '#ddd',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}>
                            {thisSection}
                        </div>
                    ))}
                </div>

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
            <h1 style={{ paddingLeft: '20px' }}>{ teamName }</h1>

            {/* Menu for each section */}
            <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                padding: '20px',
                width: '75%'
            }}>
                {allSections.map(thisSection => (
                    <div key={thisSection}
                        onClick={() => handleSectionChange(thisSection)}
                        style={{
                            padding: '10px',
                            backgroundColor: '#ddd',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                        {thisSection}
                    </div>
                ))}
            </div>


            {/* Season section drop-down menu */}
            <SeasonDropdownMenu
                teamSeason = {teamSeason}
                onChange = {setSeason}
            />
            
            <p>&nbsp;</p>
            

            {section === "Schedule" ? (
                <Schedule 
                    schedule = {schedule}
                />

            ) : section === "Roster" ? (
                <h2 style={{ paddingLeft: '20px' }}>Roster</h2>

            ) : section === "Player Stats" ? (
                <PlayerStats 
                    passers = {passers}
                    rushers = {rushers}
                    receivers = {receivers}
                    defenders = {defenders}
                    kickers = {kickers}
                />

            ) : null}

        </div>
    );
};


export default TeamPage; 