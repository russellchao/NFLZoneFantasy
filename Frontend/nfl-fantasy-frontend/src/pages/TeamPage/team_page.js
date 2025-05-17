import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataByTeam } from '../../API/player_data_api';
import PlayerStats from './PlayerStats/player_stats';

const TeamPage = () => {
    const { teamName } = useParams(); 
    const [section, setSection] = useState("Player Stats"); 
    const allSections = ["Schedule", "Player Stats", "Roster"];
    const [teamSeason, setSeason] = useState("2024"); 


    // For schedule section

    // For player stats section
    const [passers, setPassers] = useState([]); 
    const [rushers, setRushers] = useState([]); 
    const [receivers, setReceivers] = useState([]); 
    const [defenders, setDefenders] = useState([]); 
    const [kickers, setKickers] = useState([]); 
    const [loading, setLoading] = useState(true); 
  
    // For roster section



    // Section switch
    const handleSectionChange = (section) => {
        setSection(section); 
    };


    // Call the Python Flask App to update each CSV file containing player data
    async function fetchPlayerStatData() {
        try { 
            await fetch(`http://localhost:5000/playerData/${encodeURIComponent(teamSeason)}`);

        } catch (error) {
            console.error("Failed to fetch data:", error);
            return []; 
        }
    };


    useEffect(() => {
        // Update the section based on the based on the current path
        
        if (section === "Player Stats") {
            fetchPlayerStatData(); 

            // Retrieve player data from the Spring Boot Backend (for stats section)
            if (teamName) {
                // Fetch Passing data
                const loadPassers = async () => {
                    const passingData = await fetchDataByTeam("passer", teamName); 
                    setPassers(passingData); 
                    setLoading(false); 
                };
                loadPassers(); 

                // Fetch Rushing data
                const loadRushers = async () => {
                    const rushingData = await fetchDataByTeam("rusher", teamName); 
                    setRushers(rushingData); 
                    setLoading(false); 
                };
                loadRushers(); 

                // Fetch Receiving data
                const loadReceivers = async () => {
                    const receivingData = await fetchDataByTeam("receiver", teamName); 
                    setReceivers(receivingData); 
                    setLoading(false); 
                };
                loadReceivers(); 

                // Fetch Defense data
                const loadDefenders = async () => {
                    const defenseData = await fetchDataByTeam("defender", teamName); 
                    setDefenders(defenseData); 
                    setLoading(false); 
                };
                loadDefenders(); 

                // Fetch Kicking data
                const loadKickers = async () => {
                    const kickingData = await fetchDataByTeam("kicker", teamName); 
                    setKickers(kickingData); 
                    setLoading(false); 
                };
                loadKickers(); 
            };
        };

    }, [teamName, teamSeason, section]);


    if (loading) return <p style={{ paddingLeft: '20px' }}>Loading data...</p>;


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
            <p style={{paddingLeft: '20px' }}>DEBUG: Season Selected: {teamSeason}</p>
            
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