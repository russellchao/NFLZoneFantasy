// Player Stats component for team page

const PlayerStats = ({ passers, rushers, receivers, defenders, kickers }) => {

    return (
        <>
            <h2 style={{ paddingLeft: '20px' }}>Passing</h2>
            {passers.length === 0 ? (
                <p style={{ paddingLeft: '20px' }}>No passing data available for this team.</p>
            ) : (
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

            <p>&nbsp;</p>

            <h2 style={{ paddingLeft: '20px' }}>Rushing</h2>
            {rushers.length === 0 ? (
                <p style={{ paddingLeft: '20px' }}>No rushing data available for this team.</p>
            ) : (
                <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", marginLeft: "25px" }}>
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
                        {rushers.map((p) => (
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
            )}  

            <p>&nbsp;</p>

            <h2 style={{ paddingLeft: '20px' }}>Receiving</h2>
            {receivers.length === 0 ? (
                <p style={{ paddingLeft: '20px' }}>No receiving data available for this team.</p>
            ) : (
                <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", marginLeft: "25px" }}>
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
                        {receivers.map((p) => (
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
            )}  

            <p>&nbsp;</p>

            <h2 style={{ paddingLeft: '20px' }}>Defense</h2>
            {defenders.length === 0 ? (
                <p style={{ paddingLeft: '20px' }}>No defense data available for this team.</p>
            ) : (
                <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", marginLeft: "25px" }}>
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
                        {defenders.map((p) => (
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
            )}  

            <p>&nbsp;</p>

            <h2 style={{ paddingLeft: '20px' }}>Kicking</h2>
            {kickers.length === 0 ? (
                <p style={{ paddingLeft: '20px' }}>No kicking data available for this team.</p>
            ) : (
                <table border="1" cellPadding="16" style={{ borderCollapse: "collapse", marginLeft: "25px" }}>
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
                        {kickers.map((p) => (
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
            )}  
        </>
    ); 

};


export default PlayerStats; 