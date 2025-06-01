import React, {useEffect, useState} from 'react';
import { fetchScheduleByTeam, fetchUpdateScheduleDB } from '../../API/schedule_api';
import GameFinal from '../Components/Schedule/game_final';
import GameScheduled from '../Components/Schedule/game_scheduled';
import SeasonDropdownMenu from '../Components/SeasonDropdown/season_dropdown';


const FullSchedule = () => {
    const [teamSeason, setSeason] = useState("2025"); 
    const [week, setWeek] = useState("1");

    return (
        <div>
            <h1 style={{ paddingLeft:'20px' }}>Full Schedule</h1>

            {/* Season selection drop-down menu */}
            <SeasonDropdownMenu
                teamSeason = {teamSeason}
                onChange = {setSeason}
            />

            {/* Week selection dropdown menu */}
            <>
                <label for="weeks" style={{ paddingLeft: '30px' }}>Week</label>
                <select 
                    name="weeks" 
                    id="weeks" 
                    style={{marginLeft: '5px' }}
                    value={week}
                    onChange={setWeek}
                >
                    <option value="Week 1">1</option>
                    <option value="Week 2">2</option>
                    <option value="Week 3">3</option>
                    <option value="Week 4">4</option>
                    <option value="Week 5">5</option>
                    <option value="Week 6">6</option>
                    <option value="Week 7">7</option>
                    <option value="Week 8">8</option>
                    <option value="Week 9">9</option>
                    <option value="Week 10">10</option>
                    <option value="Week 11">11</option>
                    <option value="Week 12">12</option>
                    <option value="Week 13">13</option>
                    <option value="Week 14">14</option>
                    <option value="Week 15">15</option>
                    <option value="Week 16">16</option>
                    <option value="Week 17">17</option>
                    <option value="Week 18">18</option>
                    <option value="Wild Card Round">Wild Card</option>
                    <option value="Divisional Round">Divisional</option>
                    <option value="Conference Championships">Conference</option>
                    <option value="Super Bowl">Super Bowl</option>
                </select>
            </>
            
            <p>&nbsp;</p>


        </div>
    ); 

};


export default FullSchedule;