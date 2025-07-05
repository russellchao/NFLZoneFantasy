import React, {useState, useEffect} from 'react';

const HotTakes = () => {

    const currentSeason = "2025-26";

    return (
        <div style={{ padding: "20px" }}>
            <>
                <h1>Hot Takes</h1>
                <h3>This is where you can place your hottest (or not so hot) takes for the upcoming NFL season. </h3>
                <h3 style={{ color:'blue' }}>Current Season: {currentSeason}</h3>
            </>

            <br></br>

            <>
                <h2>Enter your hot takes here</h2>
                <h4 style={{ color:'maroon' }}>IMPORTANT: Hot takes are meant to be placed before the regular season and will no longer be accepted upon the start of the regular season (Sep 4, 2025).</h4>
            </>

            <br></br>

            <>
                <h4>Rules</h4>
                <p>1. You may place up to 10 hot takes.</p>
                <p>2. Hot takes must be specific and measurable. For example, "The Buffalo Bills will win the Super Bowl" is a valid hot take, while "The Bills will be good" is not.</p>
                <p>3. Hot takes that involve predicting injuries and suspensions will not be accepted.</p>
                <p>4. Hot takes that are too similar to other hot takes won't be accepted. Diversity matters!</p>
                <p>5. Each hot take will be evaluated by an NLP Model to determine its validity.</p>
                <p>6. You will be awarded User Points based on the accuracy of your hot take mesaused by an NLP Model following the Postseason.</p>
            </>

            <br></br>

            <>
                <h4>More Examples of Hot Takes</h4>
                <p>1. Lamar Jackson will have 5200 passing yards and 900 rusing yards.</p>
                <p>2. The Chicago Bears will make the playoffs.</p>
                <p>3. A Rookie Quarterback will win the MVP award.</p>
            </>

            
        </div>
    ); 

}; 

export default HotTakes;