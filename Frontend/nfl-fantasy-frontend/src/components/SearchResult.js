import React from 'react'; 

const displayOrder = [
    "Quarterbacks", "Running Backs", "Wide Receivers and Tight Ends", "Defenders", "Kickers"
];


const SearchResult = ( {nameData} ) => {

    return (
        <div style={{ paddingLeft:"20px" }}>
            <h2>Results</h2>

            {Object.keys(nameData).length > 0 ? (
                <ul>
                    {Object.entries(nameData)
                    .sort(([key1], [key2]) => {
                        return displayOrder.indexOf(key1) - displayOrder.indexOf(key2); 
                    })
                    .map(([key, value]) => {
                    
                        // Only display data for positions which the player's name actually has data 
                        const isLengthValid = value && typeof value === "object" && "length" in value && value.length > 0;
                        if (isLengthValid) {
                            return (
                                <div key={key}>
                                <h3>{key}</h3>

                                {key === "Quarterbacks" ? ( // note, actually comparing by reference, so no need for JSON.stringify()

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
                                        {value.map((p) => (
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

                                ) : key === "Running Backs" ? (

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
                                        {value.map((p) => (
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

                                ) : key === "Wide Receivers and Tight Ends" ? (

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
                                        {value.map((p) => (
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
                                
                                ) : key === "Defenders" ? ( 

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
                                        {value.map((p) => (
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

                                ) : key === "Kickers" ? (

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
                                        {value.map((p) => (
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

                                ) : (
                                    <p>&nbsp;</p>
                                )}

                            </div>
                            );
                        };
                        return null;

                    })}
                </ul>
            ) : (
                <p>&nbsp;</p>
            )}
            
        </div>


    ); 


};



export default SearchResult;