import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchPassersByTeam } from '../API/DataApi';

const TeamPage = () => {
    const { teamName } = useParams(); 
    const [passers, setPassers] = useState([]); 
    const [loading, setLoading] = useState(true); 


    useEffect(() => {

        if (teamName) {
            const loadPassers = async () => {
                const passingData = await fetchPassersByTeam(teamName); 
                setPassers(passingData); 
                setLoading(false); 
            };

            loadPassers(); 
        }

    }, [teamName]);


    if (loading) return <p>Loading data...</p>;


    return (
        <div>
            <h1>{ teamName }</h1>
            <h2>Passing</h2>
            {passers.length === 0 ? (
                <p>No data available for this team.</p>
            ) : (
                <table border="1" cellPadding="16" style={{ borderCollapse: "collapse" }}>
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
                        {passers.map((p) => (
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
            )}  
        </div>
    );
};

export default TeamPage; 