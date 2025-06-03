import React from "react";

const TeamDropdownMenu = ({ team, onChange }) => {

    return (
        <>
            <label htmlFor="team" style={{ paddingLeft: '20px' }}></label>
            <select 
                name="team" 
                id="team" 
                style={{ marginLeft: '5px' }}
                value={team}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">-</option>
                <option value="Arizona Cardinals">Arizona Cardinals</option>
                <option value="Atlanta Falcons">Atlanta Falcons</option>
                <option value="Baltimore Ravens">Baltimore Ravens</option>
                <option value="Buffalo Bills">Buffalo Bills</option>
                <option value="Carolina Panthers">Carolina Panthers</option>
                <option value="Chicago Bears">Chicago Bears</option>
                <option value="Cincinnati Bengals">Cincinnati Bengals</option>
                <option value="Cleveland Browns">Cleveland Browns</option>
                <option value="Dallas Cowboys">Dallas Cowboys</option>
                <option value="Denver Broncos">Denver Broncos</option>
                <option value="Detroit Lions">Detroit Lions</option>
                <option value="Green Bay Packers">Green Bay Packers</option>
                <option value="Houston Texans">Houston Texans</option>
                <option value="Indianapolis Colts">Indianapolis Colts</option>
                <option value="Jacksonville Jaguars">Jacksonville Jaguars</option>
                <option value="Kansas City Chiefs">Kansas City Chiefs</option>
                <option value="Las Vegas Raiders">Las Vegas Raiders</option>
                <option value="Los Angeles Chargers">Los Angeles Chargers</option>
                <option value="Los Angeles Rams">Los Angeles Rams</option>
                <option value="Miami Dolphins">Miami Dolphins</option>
                <option value="Minnesota Vikings">Minnesota Vikings</option>
                <option value="New England Patriots">New England Patriots</option>
                <option value="New Orleans Saints">New Orleans Saints</option>
                <option value="New York Giants">New York Giants</option>
                <option value="New York Jets">New York Jets</option>
                <option value="Philadelphia Eagles">Philadelphia Eagles</option>
                <option value="Pittsburgh Steelers">Pittsburgh Steelers</option>
                <option value="San Francisco 49ers">San Francisco 49ers</option>
                <option value="Seattle Seahawks">Seattle Seahawks</option>
                <option value="Tampa Bay Buccaneers">Tampa Bay Buccaneers</option>
                <option value="Tennessee Titans">Tennessee Titans</option>
                <option value="Washington Commanders">Washington Commanders</option>
            </select>
        </>
    );


}; 

export default TeamDropdownMenu;