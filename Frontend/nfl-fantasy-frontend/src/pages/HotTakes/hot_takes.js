import React, {useState, useEffect} from 'react';

const boxStyle = {
    background: 'linear-gradient(135deg, #409398ff 0%, #296b88ff 100%)',
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
    borderRadius: '12px'
};

const HotTakes = () => {
    // Get the current time 
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // NFL Kickoff Date and Season
    const currentSeason = "2025-26";
    const kickoffDate = new Date('2025-09-04T20:20:00-04:00'); // September 4, 2025 at 8:20 PM ET

    // Variable to track if hot takes are being accepted
    const [acceptingHotTakes, setAcceptingHotTakes] = useState(true);

    // Hot take submission form
    const [form, setForm] = useState({ hotTakeText: '' }); 
    const maxHotTakeLen = 100; 

    // Variables handling hot takes
    const [hotTakesArray, setHotTakesArray] = useState([]);
    const [showHotTakes, setShowHotTakes] = useState(true);
    const [hotTakeValidationMessage, setHotTakeValidationMessage] = useState('');


    const handleChange = (e) => {
        // Handles change in the hot take text input

        if (form.hotTakeText.length < maxHotTakeLen) {
            setForm({ ...form, [e.target.name]: e.target.value }); 
        } else {
            // If the hot take text is at the limit, only allow the text to be deleted
            setForm({ ...form, [e.target.name]: e.target.value.slice(0, maxHotTakeLen) });
        }
    };


    const handleSubmit = async (e) => {
        // Handles the submission of a hot take

        e.preventDefault(); 

        console.log("Hot Take Submitted:", form.hotTakeText);

        // Validate the hot take and process it 
        const validationResponse = await fetch(`http://localhost:8081/api/v1/hotTakes/validate?username=${localStorage.getItem("username")}&hotTake=${form.hotTakeText}`, {
            method: "GET"
        });
        const validationText = await validationResponse.text();
        console.log(validationText); 
        setHotTakeValidationMessage(validationText); 

        // If the hot take is valid, save it to the hot_takes table in the database with the respective username
        if (validationText === "This hot take is valid") {
            console.log("Hot take is valid, saving to database");
            const saveResponse = await fetch(`http://localhost:8081/api/v1/hotTakes/save?username=${localStorage.getItem("username")}&hotTake=${form.hotTakeText}`, {
                method: "POST"
            });
            const saveText = await saveResponse.text();
            console.log(saveText);

            // Reload the page to show the updated hot takes
            window.location.reload(); 
        }
    };


    const handleDelete = async (hotTake) => {
        // Handles the deletion of a hot take

        // Delete the requested hot take from the database
        const deletionResponse = await fetch(`http://localhost:8081/api/v1/hotTakes/delete?username=${localStorage.getItem("username")}&hotTake=${hotTake}`, {
            method: "DELETE"
        });
        const deletionText = await deletionResponse.text();
        console.log(deletionText); 

        console.log("Hot Take Deleted:", hotTake); 

        // Reload the page to show the updated hot takes
        window.location.reload();
    };


    useEffect(() => {
        // Fetch the hot takes from the database when the component mounts

        const fetchHotTakes = async () => {
            try {  
                const response = await fetch(`http://localhost:8081/api/v1/hotTakes/get?username=${localStorage.getItem("username")}`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched Hot Takes:", data);
                setHotTakesArray(data); // Set the fetched hot takes to the state

            } catch (error) {
                console.error("Failed to fetch hot takes:", error);
                setHotTakesArray([]); // Set to empty array if fetch fails
            }
        };

        fetchHotTakes(); 
    }, []); // Empty dependency array to run only once when the component mounts


    useEffect(() => {
        // Check if the current time is past the deadline for submitting hot takes
        console.log(`Current Time (ET): ${formattedTime}`);

        // Close the hot takes form if the current time is past the deadline
        if (currentTime > kickoffDate) {
            setAcceptingHotTakes(false);
        } else {
            if (!acceptingHotTakes) {
                setAcceptingHotTakes(true);
            }
        }

    } , [currentTime]);


    return (
        <>
            <div style={{ padding: "20px" }}>
                <div>
                    <h1>Hot Takes</h1>
                    <h3>This is where you can place your hottest (or not so hot) takes for the upcoming NFL season. </h3>
                    <h3 style={{ color:'aqua' }}>Current Season: {currentSeason}</h3>
                </div>

                <br></br>

                <div>
                    <h2>Enter your hot takes here</h2>
                    <h4 style={{ color:'red' }}>
                        Hot takes are meant to be placed before the regular season and will no longer be accepted upon the start of the regular season.
                        {<br></br>}
                        After that, hot takes for the following season will re-open during the following offseason.
                    </h4>
                    
                    { /* Only show the form if hot takes are being accepted */ }
                    { acceptingHotTakes ? (
                        <div>
                            <h4 style={{ color:'red' }}>Hot takes for the {currentSeason} season will close on {kickoffDate.toLocaleDateString()} at 8:20 PM Eastern Time.</h4>
                            <p>{form.hotTakeText.length}/{maxHotTakeLen}</p>
                            <form 
                                style={{ 
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '1px'
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
                                        padding: '10.5px',
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
                            <br></br>
                            {hotTakeValidationMessage}
                        </div>
                    ) : (
                        <h4 style={{ color:'maroon' }}>Sorry, hot takes are no longer being accepted.</h4>
                    )}
                    
                </div>
            </div>

            <div>
                <h2 style={{ paddingLeft: '20px' }}>
                    Your Hot Takes
                    <button 
                        onClick={() => setShowHotTakes(!showHotTakes)}
                        style={{
                            marginLeft: '15px',
                            padding: '5px 10px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        {showHotTakes ? 'Hide' : 'Show'}
                    </button>
                </h2>
                {showHotTakes && (
                    <div style={{ paddingLeft: '20px' }}>
                        <div style={boxStyle}>
                            {hotTakesArray.length > 0 ? (
                                hotTakesArray.map((hotTake, index) => (
                                    <div key={index}>
                                        <p style={{ paddingLeft: '20px', color: 'lightgreen' }}>
                                            {index+1}.  
                                            {" "}
                                            {hotTake} 
                                            {" "}
                                            <button 
                                                onClick={() => handleDelete(hotTake)}
                                                style={{
                                                    marginLeft: '10px',
                                                    padding: '2px 2px',
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    backgroundColor: 'maroon',
                                                    borderColor: 'maroon'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p style={{ paddingLeft: '20px' }}>You have not placed any hot takes yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div>
                <br></br>

                <h2 style={{ paddingLeft: '20px' }}>Rules</h2>
                <div style={{ paddingLeft: '20px' }}>
                    <div style={boxStyle}>
                        <div style={{ paddingLeft : "20px" }}>
                            <p>1. You may place up to 10 hot takes.</p>
                            <p>2. Hot takes must be specific and measurable. For example, "The Philadelphia Eagles will win the Super Bowl" is a valid hot take, but "The Eagles will be good" is not.</p>
                            <p>3. Hot takes must not contain blatantly false information. For example, "The Kansas City Chiefs will four-peat" is invalid since the Chiefs failed to three-peat.</p>
                            <p>4. A hot take that directly implies another hot take will replace the latter. For example, "The Bengals will win the AFC North" will replace "The Ravens won't win the AFC North".</p>
                            <p>5. Hot takes that contradict other hot takes or is seen as redundant won't be accepted.</p>
                            <p>6. Hot takes that involve predicting injuries and suspensions won't be accepted.</p>
                            <p>7. You will be awarded User Points based on the accuracy of your hot takes following the Postseason.</p>
                        </div>
                    </div>
                </div>

                <p>&nbsp;</p>

                <h2 style={{ paddingLeft: '20px' }}>More Examples of Hot Takes</h2>
                <div style={{ paddingLeft: '20px' }}>
                    <div style={boxStyle}>
                        <div style={{ paddingLeft : "20px" }}>
                            <p>1. Lamar Jackson will have 5200 passing yards and 900 rusing yards.</p>
                            <p>2. The Chicago Bears will make the playoffs.</p>
                            <p>3. A Rookie Quarterback will win MVP.</p>
                        </div>
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