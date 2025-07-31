import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayerDataByTeam, fetchUpdatePlayerStatsDB } from '../../API/player_data_api';
import { fetchScheduleByTeam, fetchUpdateScheduleDB } from '../../API/schedule_api';
import Schedule from './Schedule/tp_schedule';
import PlayerStats from './PlayerStats/tp_player_stats';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';
import MatchupInfo from '../Components/MatchupInfo/matchup_info';

// Import all logo images
const logoImages = require.context('../../logos/NFL Logos', false, /\.(png|jpe?g|svg)$/);

// Create a mapping of team abbreviations to logo paths
const teamLogos = {};
logoImages.keys().forEach(key => {
    // Remove './' from the start and file extension from the end
    const teamAbbr = key.replace(/^\.\//, '').replace(/\.(png|jpe?g|svg)$/, '');
    teamLogos[teamAbbr] = logoImages(key);
});

const logoStyle = {
    width: '80px',
    height: '80px',
    marginRight: '10px',
    verticalAlign: 'middle'
};

const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
};

const TeamPage = () => {
    const { teamName } = useParams(); 
    const [section, setSection] = useState("Schedule"); // Default section is Schedule
    const allSections = ["Schedule", "Player Stats"];
    const [teamSeason, setSeason] = useState("2025"); 
    const [loading, setLoading] = useState(true);

    // Track if the initial fetch has been done
    const initialFetchRef = useRef(false);

    // For schedule section
    const [schedule, setSchedule] = useState([]);
    const [preseasonSchedule, setPreseasonSchedule] = useState([]); 
    const [showPreseason, setShowPreseason] = useState(false); 
    const [scheduleError, setScheduleError] = useState(false); 
    const [viewingMatchupInfo, setViewingMatchupInfo] = useState(false); 
    const [matchToViewInfo, setMatchToViewInfo] = useState(); // The game which the user wants to view info
    

    // For player stats section
    const [passers, setPassers] = useState([]); 
    const [rushers, setRushers] = useState([]); 
    const [receivers, setReceivers] = useState([]); 
    const [defenders, setDefenders] = useState([]); 
    const [kickers, setKickers] = useState([]); 
    const [playerStatsError, setPlayerStatsError] = useState(false); 
     

    const handleSectionChange = (section) => {
        // Section switch
        setSection(section); 
    };


    async function updatePlayerStatsDB() {
        // This function updates the player stats database for the given team season

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
        // This function updates the schedule database for the given team season

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
    

    async function getScheduleData() {
        // This function retrieves the schedule data for the given team season

        console.log(`Retreiving schedule from ${teamSeason}`);
        if (teamName) {
            const loadSchedule = async () => {
                const scheduleData = await fetchScheduleByTeam(teamName);
                
                // Separate preseason games from regular season and playoff games
                const preseason = scheduleData.filter(game => game.seasonType === 1);
                const regularSeasonAndPlayoffs = scheduleData.filter(game => game.seasonType !== 1);
                
                setPreseasonSchedule(preseason);
                setSchedule(regularSeasonAndPlayoffs); 
            }
            loadSchedule();

            setLoading(false); 
        };
    }; 


    async function getPlayerStatsData() {
        // This function retrieves the player stats data for the given team season

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
            await updateScheduleDB(); 
            await updatePlayerStatsDB(); 
            await getScheduleData(); 
            await getPlayerStatsData(); 
        })();

    }, [teamSeason, teamName]);


    useEffect(() => {
        // This useEffect hook handles requests to view information about a matchup 

        if (!initialFetchRef.current) {
            return; 
        }

        console.log(`User wants to view matchup info`);

        /* 
            When viewing matchup info, we are still technically on the full schedule page.
            This block of code makes clicking on the go back button set viewingMatchupInfo to false and take the user 
            back to the full schedule when viewing matchup info, instead of go back to the page we were previously on. 
        */
        if (viewingMatchupInfo) {
            // Push a new state to the history when viewing matchup info
            window.history.pushState({ viewingMatchupInfo: true }, '');
            
            // Handle the back button
            const handlePopState = () => {
                setViewingMatchupInfo(false);
            };
            
            window.addEventListener('popstate', handlePopState);
            
            // Cleanup listener when component unmounts
            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }

    }, [viewingMatchupInfo])


    if (loading) {
        // When the page is loading data
        return (
            <p style={{ paddingLeft: '20px' }}>Loading the {teamSeason} {section} for the {teamName}...</p>
        );
    }


    if (viewingMatchupInfo) {
        // When the user is viewing information about a matchup 
        return (
            <>
                <div>
                    <br></br>

                    {/* Button to go back */}
                    <button style={{ marginLeft: '20px' }}>
                        <a 
                            style={{ textDecoration: 'none', color: 'black' }}
                            onClick={() => {
                                // Handles setting viewingMatchupInfo to false
                                window.history.back();
                            }}
                        >   
                            ← Back
                        </a>
                    </button>
                </div>

                <div>
                    {/* Matchup Info */}
                    <MatchupInfo
                        game={matchToViewInfo}
                    />

                </div>
            </>
        )
    }


    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>
                <img 
                    src={teamLogos[teamName]} 
                    alt={`${teamName} logo`} 
                    style={logoStyle}
                />
                { teamName }
            </h1>

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
                            background: 'linear-gradient(135deg, #409398ff 0%, #296b88ff 100%)',
                            border: '2px solid black',  
                            borderRadius: '10px',
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

            <label for="showPreseason" style={{ paddingLeft: '40px' }}>Show Preseason</label>
            <select 
                name="showPreseason" 
                id="showPreseason" 
                style={{marginLeft: '5px' }}
                value={showPreseason.toString()}
                onChange={(e) => setShowPreseason(e.target.value === "true")}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            
            
            <p>&nbsp;</p>


            {section === "Schedule" ? (
                <>
                    {scheduleError ? (
                        <p style={{ paddingLeft: '20px' }}>Error, could not load the schedule for the {teamSeason} season.</p>
                    ) : showPreseason ? (
                        <>
                            <h2 style={{ paddingLeft: '20px' }}>{teamSeason} {teamName} Preseason Schedule</h2>
                            <p>&nbsp;</p>
                            <Schedule 
                                schedule = {preseasonSchedule}
                                setViewingMatchupInfo={setViewingMatchupInfo}
                                setMatchToViewInfo={setMatchToViewInfo}
                            />
                        </>
                    ) : (
                        <>
                            <h2 style={{ paddingLeft: '20px' }}>{teamSeason} {teamName} Schedule</h2>
                            <p>&nbsp;</p>
                            <Schedule 
                                schedule = {schedule}
                                setViewingMatchupInfo={setViewingMatchupInfo}
                                setMatchToViewInfo={setMatchToViewInfo}
                            /> 
                        </>
                    )}
                </>

            ) : section === "Player Stats" ? (
                <>
                    {playerStatsError ? (
                        <p style={{ paddingLeft: '20px' }}>Error, could not load the player stats for the {teamSeason} season.</p>
                    ) : (
                        <>
                            <h2 style={{ paddingLeft: '20px' }}>{teamSeason} {teamName} Player Stats</h2>
                            <p>&nbsp;</p>
                            <PlayerStats 
                                passers = {passers}
                                rushers = {rushers}
                                receivers = {receivers}
                                defenders = {defenders}
                                kickers = {kickers}
                            />
                        </>
                    )}
                </>

            ) : null}

            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    );
};


export default TeamPage; 