import React, {useState, useEffect} from 'react';

const boxStyle = {
    background: '#b3fff0',
    margin: '0%',
    width: '80%',
    minWidth: '350px',
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0px 0',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
    border: '2px solid black',  
    borderRadius: '4px'
};

const HotTakes = () => {

    const currentSeason = "2025-26";

    const [form, setForm] = useState({ hotTakeText: '' }); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    return (
        <>
            <div style={{ padding: "20px" }}>
                <div>
                    <h1>Hot Takes</h1>
                    <h3>This is where you can place your hottest (or not so hot) takes for the upcoming NFL season. </h3>
                    <h3 style={{ color:'blue' }}>Current Season: {currentSeason}</h3>
                </div>

                <br></br>

                <div>
                    <h2>Enter your hot takes here</h2>
                    <h4 style={{ color:'maroon' }}>IMPORTANT: Hot takes are meant to be placed before the regular season and will no longer be accepted upon the start of the regular season (Sep 4, 2025).</h4>
                    <form 
                        style={{ 
                            paddingLeft: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                        // onSubmit={handleSubmit}
                    >
                        <div>
                            <input 
                                name="hotTakeText" 
                                placeholder="Enter your hot take here..." 
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                                onChange={handleChange} 
                                required 
                            />

                            <button 
                                type="submit"
                                style={{
                                    padding: '9px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginLeft: '2px'
                                }}
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <div>
                <p>&nbsp;</p>

                <div style={boxStyle}>
                    <div style={{ paddingLeft : "20px" }}>
                        <h4>Rules</h4>
                        <p>1. You may place up to 10 hot takes.</p>
                        <p>2. Hot takes must be specific and measurable. For example, "The Buffalo Bills will win the Super Bowl" is a valid hot take, but "The Bills will be good" is not.</p>
                        <p>3. Hot takes must not contain blatantly false information. For example, "The Kansas City Chiefs will four-peat" is invalid since the Chiefs failed to three-peat.</p>
                        <p>4. Hot takes that involve predicting injuries and suspensions will not be accepted.</p>
                        <p>5. Hot takes that are too similar to other hot takes won't be accepted. Diversity matters!</p>
                        <p>6. Each hot take will be evaluated by an NLP Model to determine its validity.</p>
                        <p>7. You will be awarded User Points based on the accuracy of your hot take mesaused by an NLP Model following the Postseason.</p>
                    </div>
                </div>

                <p>&nbsp;</p>

                <div style={boxStyle}>
                    <div style={{ paddingLeft : "20px" }}>
                        <h4>More Examples of Hot Takes</h4>
                        <p>1. Lamar Jackson will have 5200 passing yards and 900 rusing yards.</p>
                        <p>2. The Chicago Bears will make the playoffs.</p>
                        <p>3. A Rookie Quarterback will win the MVP award.</p>
                    </div>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                
            </div>

        </>

    ); 

}; 

export default HotTakes;