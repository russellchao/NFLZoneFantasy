import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataByTeam } from '../../API/player_data_api';
import PlayerStats from './PlayerStats/tp_player_stats';

const TeamPage = () => {
    const { teamName } = useParams(); 
    const [section, setSection] = useState("Player Stats"); 
    const allSections = ["Schedule", "Player Stats", "Roster"];
    const [teamSeason, setSeason] = useState("2024"); 
    const [loading, setLoading] = useState(true);
    const [loadError, throwLoadError] = useState(false); 


    // For schedule section


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


    // Call the Specialized Spring Boot endpoint to update the database with the updated player stats CSV file (from calling Flask endpoint)
    async function updatePlayerStatsDB() {

        if (!loading) {
            setLoading(true); 
        }

        try { 
            const response = await fetch(`http://localhost:8081/api/v1/updateDB?season=${encodeURIComponent(teamSeason)}`);
            console.log("Finished updating player stats database");

            const result = await response.text(); 
            console.log(result);

            // could not fetch player data for the specified season
            if (result === "Failure updating CSVs") {
                console.log("Error fetching player stats");
                throwLoadError(true); 
            } 

        } catch (error) {
            console.error("Failed to fetch data:", error);
            return []; 
        }
    };


    useEffect(() => {
        // Update the section based on the based on the current path

        if (section === "Player Stats") {
            (async () => { 
                /*** 
                 * Placing this logic on an async wrapper allows us to wait for the database 
                 * to completely update before fetching the data
                 * */ 

                await updatePlayerStatsDB(); 
                console.log(`Retreiving player stats from ${teamSeason}`)

                // Retrieve player data from the Spring Boot Backend (for stats section)
                if (teamName) {
                    // Fetch Passing data
                    const loadPassers = async () => {
                        const passingData = await fetchDataByTeam("passer", teamName); 
                        setPassers(passingData); 
                    };
                    loadPassers(); 

                    // Fetch Rushing data
                    const loadRushers = async () => {
                        const rushingData = await fetchDataByTeam("rusher", teamName); 
                        setRushers(rushingData); 
                    };
                    loadRushers(); 

                    // Fetch Receiving data
                    const loadReceivers = async () => {
                        const receivingData = await fetchDataByTeam("receiver", teamName); 
                        setReceivers(receivingData); 
                    };
                    loadReceivers(); 

                    // Fetch Defense data
                    const loadDefenders = async () => {
                        const defenseData = await fetchDataByTeam("defender", teamName); 
                        setDefenders(defenseData); 
                    };
                    loadDefenders(); 

                    // Fetch Kicking data
                    const loadKickers = async () => {
                        const kickingData = await fetchDataByTeam("kicker", teamName); 
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

                {/* Season section drop-down menu */}
                <label for="seasons" style={{ paddingLeft: '20px' }}>Season</label>
                <select 
                    name="seasons" 
                    id="seasons" 
                    style={{marginLeft: '5px' }}
                    value={teamSeason}
                    onChange={(e) => setSeason(e.target.value)}
                >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                </select>
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
            <label for="seasons" style={{ paddingLeft: '20px' }}>Season</label>
            <select 
                name="seasons" 
                id="seasons" 
                style={{marginLeft: '5px' }}
                value={teamSeason}
                onChange={(e) => setSeason(e.target.value)}
            >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
            </select>
            
            <p>&nbsp;</p>
            

            {section === "Schedule" ? (
                <h2 style={{ paddingLeft: '20px' }}>Schedule</h2>

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

            ) : null}; 

        </div>
    );
};


export default TeamPage; 