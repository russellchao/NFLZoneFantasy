import React, { useEffect, useState } from 'react';
import SearchResult from './SearchResult/search_result'; 
import { fetchDataByName } from '../../API/player_data_api';


export const Search = () => {

    const [name, setName] = useState(""); 
    const [nameData, setNameData] = useState([]); 
    const [searched, setSearched] = useState(false); 
    const [loading, setLoading] = useState(false); 

    const HandleSubmit = (event) => {
        if (!searched && name !== "") {
            event.preventDefault(); // prevents page reload
            setSearched(true); 
            setLoading(true); 
        };
    };


    useEffect(() => {
        if (name) {
            const loadNameData = async () => {
                if (searched && name) {
                    const getNameData = await fetchDataByName(name); 
                    setNameData(getNameData); 
                    setLoading(false); 
                }
            };
            loadNameData(); 
        }

    }, [searched, name]); 


    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Player Search</h1> 

            {/* using <form onSubmit={HandleSubmit}> allows user to press both enter and the submit button as a means to submit */}
            <form onSubmit={HandleSubmit}> 
                <input 
                    type="text" 
                    placeholder="Search..." 
                    style={{ marginLeft:"25px", height:"30px", width:"500px" }}
                    value={name}
                    onChange={(e) => [setName(e.target.value), setSearched(false)]}>
                </input>

                <button 
                    type='submit' 
                    style={{ height:"37px", width:"100px", backgroundColor:"#7FFFD4" }}
                    // onClick={HandleSubmit}
                    >
                    Submit
                </button>
            </form>

            {loading === true ? (
                <p style ={{ paddingLeft:"20px" }}>Loading Data...</p>
            ) : searched === true ? (
                <SearchResult nameData={nameData}/>
            ) : (
                <p>&nbsp;</p>
            )}

            <p>&nbsp;</p>
            <p>&nbsp;</p>

        </div>
    );
};




export default Search; 