import React, { useEffect, useState } from 'react';
import SearchResult from '../components/SearchResult'; 


export const Search = () => {

    const [name, setName] = useState(""); 
    const [nameData, setNameData] = useState([]); 
    const [searched, setSearch] = useState(false); 
    const [loading, setLoading] = useState(true); 

    const handleSubmit = (event) => {
        event.preventDefault(); // prevents page reload
        
        // send a get request to spring boot backend
        useEffect(() => {
            if (name) {
                const loadNameData = async () => {
                    const getNameData = await fetchDataByName(name); 
                    setNameData(getNameData); 
                    setLoading(false); 
                };
                loadPosData(); 
            }

        }, [name]); 

        setSearch(true); 
    };

    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Player Search</h1> 

            <input 
                type="text" 
                placeholder="Search..." 
                style={{ marginLeft:"25px", height:"30px", width:"500px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}>
            </input>

            <button 
                type='submit' 
                style={{ height:"37px", width:"100px", backgroundColor:"#7FFFD4" }}
                onClick={handleSubmit}>
                Submit
            </button>

            <p>&nbsp;</p>

            {searched == true ? (
                <SearchResult />
            ) : (
                <p>&nbsp;</p>
            )}

        </div>
    );
};




export default Search; 