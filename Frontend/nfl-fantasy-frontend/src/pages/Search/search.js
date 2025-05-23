import React, { useEffect, useState } from 'react';
import SearchResult from './SearchResult/search_result'; 
import { fetchDataByName } from '../../API/player_data_api';
import SeasonDropdownMenu from '../Components/season_dropdown';


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
                const getNameData = await fetchDataByName(name); 
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
            <form onSubmit={HandleSubmit}> 
                <input 
                    type="text" 
                    placeholder="Search..." 
                    style={{ marginLeft:"25px", height:"30px", width:"500px" }}
                    value={name}
                    onChange={(e) => [setName(e.target.value), setSearched(false)]}>
                </input>

                <button 
                    type='submit' 
                    style={{ height:"37px", width:"100px", backgroundColor:"#7FFFD4" }}
                    // onClick={HandleSubmit}
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

            <p>&nbsp;</p>
            <p>&nbsp;</p>

        </div>
    );
};




export default Search; 