import React from "react";

const WeekDropdownMenu = ({ week, onChange }) => {

    return (
        <>
            <label htmlFor="weeks" style={{ paddingLeft: '20px' }}>Week</label>
            <select 
                name="weeks" 
                id="weeks" 
                style={{ marginLeft: '5px' }}
                value={week}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="Hall of Fame Week">HOF Week</option>
                <option value="Preseason Week 1">Pre 1</option>
                <option value="Preseason Week 2">Pre 2</option>
                <option value="Preseason Week 3">Pre 3</option>
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
    );


}; 

export default WeekDropdownMenu;