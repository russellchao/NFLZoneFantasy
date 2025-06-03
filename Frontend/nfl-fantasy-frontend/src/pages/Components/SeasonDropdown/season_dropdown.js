// Season selection dropdown menu for team, position, and search pages
import React from 'react'; 


const SeasonDropdownMenu = ({ teamSeason, onChange }) => {

    return (
        <>
            <label for="seasons" style={{ paddingLeft: '20px' }}>Season</label>
            <select 
                name="seasons" 
                id="seasons" 
                style={{marginLeft: '5px' }}
                value={teamSeason}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
            </select>
        </>
    );

};


export default SeasonDropdownMenu; 