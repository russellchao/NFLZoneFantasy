import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataByPosition } from '../../API/player_data_api';
import SeasonDropdownMenu from '../Components/season_dropdown';


const PositionPage = () => {
    const { positionName } = useParams(); 
    const [positionData, setPosData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [loadError, throwLoadError] = useState(false); 
    const [numPlayersShown, setPlayersShown] = useState(10); 
    const [teamSeason, setSeason] = useState("2024"); 


    // Expand table function
    const expandTable = () => {
        setPlayersShown(prevCount => prevCount + 10); 
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


    // Retrieve position data from the Spring Boot Backend
    useEffect(() => {
        throwLoadError(false); // reset loadError to false on each load

        (async () => {
            await updatePlayerStatsDB(); 

            if (positionName) {
                const loadPosData = async () => {
                    const posData = await fetchDataByPosition(positionName); 
                    setPosData(posData); 
                };
                loadPosData(); 

                setLoading(false); 
            }
        })(); 
        
    }, [positionName, teamSeason]);


    // When the page is loading data
    if (loading) {
        return (
            <p style={{ paddingLeft: '20px' }}>Loading {positionName} data for the {teamSeason} season...</p>
        );
    }



    // When the player stats cannot be fetched
    if (loadError) {
        return (
            <div>
                <p style={{ paddingLeft: '20px' }}>
                    Error, could not load {positionName}s for the {teamSeason} season.
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
            <h1 style={{ paddingLeft: '20px' }}>{ positionName + "s"}</h1>


            {/* Season section drop-down menu */}
            <SeasonDropdownMenu
                teamSeason = {teamSeason}
                onChange = {setSeason}
            />


            <p>&nbsp;</p>


            {positionData.length === 0 ? (
                <p style={{ paddingLeft: '20px' }}>No data available for this position.</p>
            ) : JSON.stringify(positionName) === JSON.stringify("Quarterback") ? (
                <>
                    <div style={{ marginLeft: '25px', width: '75%' }}>
                        <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                <th>Name</th>  
                                <th>Age</th>  
                                <th>Team</th>  
                                <th>Pos</th>  
                                <th>GP</th>  
                                <th>Cmp</th>  
                                <th>Att</th>  
                                <th>Cmp%</th>  
                                <th>Yds</th>  
                                <th>TD</th>  
                                <th>Int</th>  
                                <th>Long</th>  
                                <th>Y/G</th>  
                                <th>Rate</th>  
                                <th>QBR</th>  
                                <th>Sack</th>  
                                </tr>
                            </thead>
                            <tbody>
                                {positionData.slice(0, numPlayersShown).map((p) => ( // Initially show only the first 10 players
                                    <tr key={`${p.name}-${p.team}`}>
                                        <td>{p.name}</td>
                                        <td>{p.age}</td>
                                        <td>{p.team}</td>
                                        <td>{p.pos}</td>
                                        <td>{p.gp}</td>
                                        <td>{p.cmp}</td>
                                        <td>{p.att}</td>
                                        <td>{p.cmpPct}</td>
                                        <td>{p.yds}</td>
                                        <td>{p.td}</td>
                                        <td>{p.int}</td>
                                        <td>{p.long}</td>
                                        <td>{p.ypg}</td>
                                        <td>{p.rate}</td>
                                        <td>{p.qbr}</td>
                                        <td>{p.sack}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        {numPlayersShown < positionData.length && ( // expand the table with the next 10 (or remaining) players with a button
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={expandTable}>Expand</button>
                            </div>
                        )}

                        <div style={{ textAlign: 'right' }}>
                            <p style={{ display: 'inline-block' }}>
                                Showing {Math.min(numPlayersShown, positionData.length)} of {positionData.length}
                            </p>
                        </div>

                    </div>
                </>
                    

            ) : JSON.stringify(positionName) === JSON.stringify("Running Back") ? (
                <>
                    <div style={{ marginLeft: '25px', width: '75%' }}>
                        <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                <th>Name</th>  
                                <th>Age</th>  
                                <th>Team</th>  
                                <th>Pos</th>  
                                <th>GP</th>  
                                <th>Att</th>  
                                <th>Yds</th>  
                                <th>TD</th>  
                                <th>Long</th>  
                                <th>Y/G</th>  
                                <th>Fmb</th>  
                                </tr>
                            </thead>
                            <tbody>
                                {positionData.slice(0, numPlayersShown).map((p) => ( // Initially show only the first 10 players
                                    <tr key={`${p.name}-${p.team}`}>
                                        <td>{p.name}</td>
                                        <td>{p.age}</td>
                                        <td>{p.team}</td>
                                        <td>{p.pos}</td>
                                        <td>{p.gp}</td>
                                        <td>{p.att}</td>
                                        <td>{p.yds}</td>
                                        <td>{p.td}</td>
                                        <td>{p.long}</td>
                                        <td>{p.ypg}</td>
                                        <td>{p.fmb}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {numPlayersShown < positionData.length && ( // expand the table with the next 10 (or remaining) players with a button
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={expandTable}>Expand</button>
                            </div>
                        )}

                        <div style={{ textAlign: 'right' }}>
                            <p style={{ display: 'inline-block' }}>
                                Showing {Math.min(numPlayersShown, positionData.length)} of {positionData.length}
                            </p>
                        </div>

                    </div>
                </>

            ) : JSON.stringify(positionName) === JSON.stringify("Wide Receiver") || JSON.stringify(positionName) === JSON.stringify("Tight End") ? (
                <>
                    <div style={{ marginLeft: '25px', width: '75%' }}>
                        <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                <th>Name</th>  
                                <th>Age</th>  
                                <th>Team</th>  
                                <th>Pos</th>  
                                <th>GP</th>  
                                <th>Rec</th>  
                                <th>Yds</th>  
                                <th>TD</th>  
                                <th>Long</th>  
                                <th>Y/G</th>  
                                <th>Fmb</th>  
                                </tr>
                            </thead>
                            <tbody>
                                {positionData.slice(0, numPlayersShown).map((p) => ( // Initially show only the first 10 players
                                    <tr key={`${p.name}-${p.team}`}> 
                                        <td>{p.name}</td>
                                        <td>{p.age}</td>
                                        <td>{p.team}</td>
                                        <td>{p.pos}</td>
                                        <td>{p.gp}</td>
                                        <td>{p.rec}</td>
                                        <td>{p.yds}</td>
                                        <td>{p.td}</td>
                                        <td>{p.long}</td>
                                        <td>{p.ypg}</td>
                                        <td>{p.fmb}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {numPlayersShown < positionData.length && ( // expand the table with the next 10 (or remaining) players with a button
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={expandTable}>Expand</button>
                            </div>
                        )}

                        <div style={{ textAlign: 'right' }}>
                            <p style={{ display: 'inline-block' }}>
                                Showing {Math.min(numPlayersShown, positionData.length)} of {positionData.length}
                            </p>
                        </div>

                    </div>
                </>

            ) : JSON.stringify(positionName) === JSON.stringify("Defensive End") || JSON.stringify(positionName) === JSON.stringify("Linebacker") || JSON.stringify(positionName) === JSON.stringify("Cornerback") || JSON.stringify(positionName) === JSON.stringify("Safety") ? (
                <>
                    <div style={{ marginLeft: '25px', width: '75%' }}>
                        <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                <th>Name</th>  
                                <th>Age</th>  
                                <th>Team</th>  
                                <th>Pos</th>  
                                <th>GP</th>  
                                <th>Tck</th>
                                <th>Solo</th>
                                <th>Asst</th>
                                <th>TFL</th>
                                <th>Sack</th>
                                <th>PBU</th>
                                <th>INT</th>
                                <th>INT TD</th>
                                <th>FF</th>
                                <th>FR</th>
                                <th>FR TD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {positionData.slice(0, numPlayersShown).map((p) => ( // Initially show only the first 10 players
                                    <tr key={`${p.name}-${p.team}`}>
                                        <td>{p.name}</td>
                                        <td>{p.age}</td>
                                        <td>{p.team}</td>
                                        <td>{p.pos}</td>
                                        <td>{p.gp}</td>
                                        <td>{p.tck}</td>
                                        <td>{p.solo}</td>
                                        <td>{p.asst}</td>
                                        <td>{p.tfl}</td>
                                        <td>{p.sack}</td>
                                        <td>{p.pbu}</td>
                                        <td>{p.int}</td>
                                        <td>{p.intTD}</td>
                                        <td>{p.ff}</td>
                                        <td>{p.fr}</td>
                                        <td>{p.frtd}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {numPlayersShown < positionData.length && ( // expand the table with the next 10 (or remaining) players with a button
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={expandTable}>Expand</button>
                            </div>
                        )}

                        <div style={{ textAlign: 'right' }}>
                            <p style={{ display: 'inline-block' }}>
                                Showing {Math.min(numPlayersShown, positionData.length)} of {positionData.length}
                            </p>
                        </div>

                    </div>
                </>

            ) : JSON.stringify(positionName) === JSON.stringify("Kicker") ? (
                <>
                    <div style={{ marginLeft: '25px', width: '75%' }}>
                        <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                <th>Name</th>  
                                <th>Age</th>  
                                <th>Team</th>  
                                <th>Pos</th>  
                                <th>GP</th>  
                                <th>FGA</th>
                                <th>FGM</th>
                                <th>Long</th>
                                <th>XPA</th>
                                <th>XPM</th>
                                <th>KO</th>
                                <th>KO YDS</th>
                                <th>TB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {positionData.slice(0, numPlayersShown).map((p) => ( // Initially show only the first 10 players
                                    <tr key={`${p.name}-${p.team}`}>
                                        <td>{p.name}</td>
                                        <td>{p.age}</td>
                                        <td>{p.team}</td>
                                        <td>{p.pos}</td>
                                        <td>{p.gp}</td>
                                        <td>{p.fga}</td>
                                        <td>{p.fgm}</td>
                                        <td>{p.long}</td>
                                        <td>{p.xpa}</td>
                                        <td>{p.xpm}</td>
                                        <td>{p.ko}</td>
                                        <td>{p.koYds}</td>
                                        <td>{p.tb}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {numPlayersShown < positionData.length && ( // expand the table with the next 10 (or remaining) players with a button
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={expandTable}>Expand</button>
                            </div>
                        )}

                        <div style={{ textAlign: 'right' }}>
                            <p style={{ display: 'inline-block' }}>
                                Showing {Math.min(numPlayersShown, positionData.length)} of {positionData.length}
                            </p>
                        </div>

                    </div>
                </>

            ) : (
                <p style={{ paddingLeft: '20px' }}>Table format for {positionName} not implemented yet.</p>
            )}

            <p>&nbsp;</p>
            <p>&nbsp;</p>

        </div>
    );
    
};


export default PositionPage; 