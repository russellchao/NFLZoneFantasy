import React, { useEffect, useState } from 'react';
import SearchResult from './SearchResult/search_result'; 
import { fetchPlayerDataByName, fetchUpdatePlayerStatsDB } from '../../API/player_data_api';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';


export const Search = () => {

    const [name, setName] = useState(""); 
    const [nameData, setNameData] = useState([]); 
    const [searched, setSearched] = useState(false); 
    const [teamSeason, setSeason] = useState("2024"); 
    const [loadingSeason, setLoadingSeason] = useState(true); 
    const [loadingPlayer, setLoadingPlayer] = useState(false); 
    const [loadError, throwLoadError] = useState(false); 


    // Call the Specialized Spring Boot endpoint to update the database with the updated player stats CSV file (from calling Flask endpoint)
    async function updatePlayerStatsDB() {
        if (!loadingSeason) {
            setLoadingSeason(true); 
        }

        // In case updating the player stats CSV is unsuccessful, the function will return such a response
        const csv_result = await fetchUpdatePlayerStatsDB(teamSeason); 

        if (csv_result === "Failure updating CSVs") { throwLoadError(true); }
    };


    const HandleSubmit = (event) => {
        event.preventDefault(); // prevents page reload

        if (!searched && name !== "") {
            setSearched(true); 
            setLoadingPlayer(true); 
        };
    };


    // Only used when the user changes the season
    useEffect(() => {
        (async () => {
            setSearched(false); 
            throwLoadError(false);
            await updatePlayerStatsDB();
            setLoadingSeason(false); 

        })(); 
    }, [teamSeason]); 


    // Only used when the user hits submit
    useEffect(() => {
        throwLoadError(false); // reset loadError to false on each load

        const loadNameData = async () => {
            console.log(`Retreiving player stats from ${teamSeason}`)

            if (searched && name) {
                const getNameData = await fetchPlayerDataByName(name); 
                setNameData(getNameData); 
                setLoadingPlayer(false); 
            }
        };
        loadNameData(); 

    }, [searched, name, teamSeason]); 


    // When the season is loading
    if (loadingSeason) {
        return (
            <p style={{ paddingLeft: '20px' }}>Loading player data for the {teamSeason} NFL season...</p>
        );
    }


    // When the player stats cannot be fetched
    if (loadError) {
        return (
            <div>
                <p style={{ paddingLeft: '20px' }}>
                    Error, could not load player data for the {teamSeason} NFL season.
                </p>

                {/* Season section drop-down menu */}
                <SeasonDropdownMenu
                    teamSeason = {teamSeason}
                    onChange = {(newSeason) => {
                        setSeason(newSeason); 
                    }}
                />
                
            </div>
        );
    }


    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Player Search</h1> 


            {/* Season section drop-down menu */}
            <SeasonDropdownMenu
                teamSeason = {teamSeason}
                onChange = {setSeason}
            />


            <p>&nbsp;</p>


            {/* using <form onSubmit={HandleSubmit}> allows user to press both enter and the submit button as a means to submit */}
            <form 
                onSubmit={HandleSubmit}
            > 
                <input 
                    type="text" 
                    placeholder="Search..." 
                    style={{ marginLeft:"25px", height:"30px", width:"500px" }}
                    value={name}
                    onChange={(e) => [setName(e.target.value), setSearched(false)]}>
                </input>

                <button 
                    type='submit' 
                    style={{ 
                        padding: '8px 13px',
                        backgroundColor: '#004d4d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        fontFamily: 'Segoe UI, sans-serif',
                        marginLeft: '3px'
                    }}
                    >
                    Submit
                </button>
            </form>

            {loadingPlayer === true ? (
                <p style ={{ paddingLeft:"20px" }}>Loading Data...</p>
            ) : searched === true ? (
                <SearchResult nameData={nameData}/>
            ) : (
                <p>&nbsp;</p>
            )}

            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    );
};




export default Search; 