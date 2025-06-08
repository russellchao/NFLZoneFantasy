import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayerDataByTeam, fetchUpdatePlayerStatsDB } from '../../API/player_data_api';
import { fetchScheduleByTeam, fetchUpdateScheduleDB } from '../../API/schedule_api';
import Schedule from './Schedule/tp_schedule';
import PlayerStats from './PlayerStats/tp_player_stats';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';


const TeamPage = () => {
    const { teamName } = useParams(); 
    const [section, setSection] = useState("Schedule"); // Default section is Schedule
    const allSections = ["Schedule", "Player Stats", "Roster"];
    const [teamSeason, setSeason] = useState("2025"); 
    const [loading, setLoading] = useState(true);

    // Track if the initial fetch has been done
    const initialFetchRef = useRef(false);


    // For schedule section
    const [schedule, setSchedule] = useState([]); 
    const [scheduleError, setScheduleError] = useState(false); 


    // For player stats section
    const [passers, setPassers] = useState([]); 
    const [rushers, setRushers] = useState([]); 
    const [receivers, setReceivers] = useState([]); 
    const [defenders, setDefenders] = useState([]); 
    const [kickers, setKickers] = useState([]); 
    const [playerStatsError, setPlayerStatsError] = useState(false); 
     
  
    // For roster section
    const [rosterError, setRosterError] = useState(false); 



    // Section switch
    const handleSectionChange = (section) => {
        setSection(section); 
    };


    // Functions to call the Spring Boot endpoints that update the specified CSV and database table
    async function updatePlayerStatsDB() {
        if (!loading) {
            setLoading(true); 
        }

        const response = await fetchUpdatePlayerStatsDB(teamSeason); 

        if (response === "Failure updating CSVs") {
            setPlayerStatsError(true); 
            setLoading(false); 
            return; 
        }
    };

    async function updateScheduleDB() {
        if (!loading) {
            setLoading(true); 
        }

        const response = await fetchUpdateScheduleDB(teamSeason); 

        if (response === "Failure updating CSVs") {
            setScheduleError(true); 
            setLoading(false); 
            return; 
        }
    };




    useEffect(() => {
        setPlayerStatsError(false);
        setScheduleError(false);

        // Only update the databases on initial load or if the season changes
        if (initialFetchRef.current) {
            return; 
        } else {
            initialFetchRef.current = true; 
        }

        (async () => {
            // Update the schedule database
            await updateScheduleDB(); 

            // Update the player stats database
            await updatePlayerStatsDB(); 

            // Update the roster database
            // NOTE: Roster data is not currently being fetched from the Spring Boot Backend, so this function is not implemented
    


            // Retrieve schedule from the Spring Boot Backend
            console.log(`Retreiving schedule from ${teamSeason}`);
            if (teamName) {
                const loadSchedule = async () => {
                    const scheduleData = await fetchScheduleByTeam(teamName); 
                    setSchedule(scheduleData); 
                }
                loadSchedule();

                setLoading(false); 

                console.log(schedule);
            };
                


            // Retrieve player data from the Spring Boot Backend (for player stats section)
            console.log(`Retreiving player stats from ${teamSeason}`); 
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

    }, [teamSeason, teamName]);


    // When the page is loading data
    if (loading) {
        return (
            <p style={{ paddingLeft: '20px' }}>Loading the {teamSeason} {section} for the {teamName}...</p>
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
                onChange={(newSeason) => {
                    setSeason(newSeason);
                    initialFetchRef.current = false;
                }}
            />
            
            <p>&nbsp;</p>
            

            {section === "Schedule" ? (
                <>
                    {scheduleError ? (
                        <p style={{ paddingLeft: '20px' }}>Error, could not load the schedule for the {teamSeason} season.</p>
                    ) : (
                        <Schedule 
                            schedule = {schedule}
                        /> 
                    )}
                </>

            ) : section === "Roster" ? (
                <h2 style={{ paddingLeft: '20px' }}>Roster</h2>

            ) : section === "Player Stats" ? (
                <>
                    {playerStatsError ? (
                        <p style={{ paddingLeft: '20px' }}>Error, could not load the player stats for the {teamSeason} season.</p>
                    ) : (
                        <PlayerStats 
                            passers = {passers}
                            rushers = {rushers}
                            receivers = {receivers}
                            defenders = {defenders}
                            kickers = {kickers}
                        />
                    )}
                </>

            ) : null}

        </div>
    );
};


export default TeamPage; 