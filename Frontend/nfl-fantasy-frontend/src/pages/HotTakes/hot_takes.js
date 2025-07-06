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

    // Get the current time 
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const currentSeason = "2025-26";
    const [acceptingHotTakes, setAcceptingHotTakes] = useState(true);
    const [form, setForm] = useState({ hotTakeText: '' }); 


    const handleChange = (e) => {
        // Handles change in the hot take text input
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };


    const handleSubmit = async (e) => {
        // Handles the hot take submission
        e.preventDefault(); 

        console.log("Hot Take Submitted:", form.hotTakeText);

        // Here you would typically send the form data to your backend
        /**
         * TODO: 
         * 1. Call the Java Spring Boot API to submit the hot take
         * 2. Send it through an NLP Model to validate the hot take
         * 3. 
         */

        

        setForm({ hotTakeText: '' }); // Reset the form after submission
    };


    useEffect(() => {
        // Check if the current time is past the deadline for submitting hot takes

        console.log(`Current Time (ET): ${formattedTime}`);

        const deadline = new Date('2025-09-04T20:20:00-04:00'); // September 4, 2025 at 8:20 PM ET

        // Close the hot takes form if the current time is past the deadline
        if (currentTime > deadline) {
            setAcceptingHotTakes(false);
            console.log("Hot takes are no longer being accepted.");
        } else {
            if (!acceptingHotTakes) {
                setAcceptingHotTakes(true);
            }
            console.log("Hot takes are still being accepted.");
        }

    } , [currentTime]);



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
                    <h4 style={{ color:'maroon' }}>IMPORTANT: Hot takes are meant to be placed before the regular season and will no longer be accepted upon the start of the regular season.</h4>
                    <h4 style={{ color:'maroon' }}>This field will close September 4, 2025 at 8:20 PM Eastern Time.</h4>
                    
                    { /* Only show the form if hot takes are being accepted */ }
                    { acceptingHotTakes ? ( 
                        <form 
                            style={{ 
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '20px'
                            }}
                            onSubmit={handleSubmit}
                        >
                            <input 
                                name="hotTakeText" 
                                placeholder="Enter your hot take here..." 
                                style={{ 
                                    padding: '8px', 
                                    borderRadius: '4px', 
                                    border: '1px solid #ccc', 
                                    width: '600px', 
                                    height: '20px' 
                                }}
                                onChange={handleChange} 
                                required 
                                value={form.hotTakeText}
                            />

                            <button 
                                type="submit"
                                style={{
                                    padding: '11px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <h2>Sorry, hot takes are no longer being accepted.</h2>
                    )}
                    
                </div>
            </div>

            <div>
                <p>&nbsp;</p>

                <div style={boxStyle}>
                    <div style={{ paddingLeft : "20px" }}>
                        <h4>Rules</h4>
                        <p>1. You may place up to 10 hot takes.</p>
                        <p>2. Hot takes must be specific and measurable. For example, "The Philadelphia Eagles will win the Super Bowl" is a valid hot take, but "The Eagles will be good" is not.</p>
                        <p>3. Hot takes must not contain blatantly false information. For example, "The Kansas City Chiefs will four-peat" is invalid since the Chiefs failed to three-peat.</p>
                        <p>4. Hot takes that involve predicting injuries and suspensions will not be accepted.</p>
                        <p>5. Hot takes that contradict other hot takes won't be accepted.</p>
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