import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataByPosition } from '../API/DataApi';


const PositionPage = () => {
    const { positionName } = useParams(); 
    const [position, setPosData] = useState([]); 
    const [loading, setLoading] = useState(true); 


    // Retrieve position data from the Spring Boot Backend
    useEffect(() => {
        if (positionName) {
            const loadPosData = async () => {
                const posData = await fetchDataByPosition(positionName); 
                setPosData(posData); 
                setLoading(false); 
            };
            loadPosData(); 
        }

    }, [positionName]);


    if (loading) return <p>Loading data...</p>;


    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>{ positionName + "s"}</h1>

            <p>&nbsp;</p>

            {position.length === 0 ? (
                <p style={{ paddingLeft: '20px' }}>No data available for this position.</p>
            ) : JSON.stringify(positionName) === JSON.stringify("Quarterback") ? (
                <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", marginLeft: "25px" }}>
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
                        {position.map((p) => (
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

            ) : (
                <p style={{ paddingLeft: '20px' }}>Table format for {positionName} not implemented yet.</p>
            )}

            <p>&nbsp;</p>
            <p>&nbsp;</p>

        </div>
    );
    
};








export default PositionPage; 