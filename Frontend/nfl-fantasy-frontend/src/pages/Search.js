import React, { useEffect, useState } from 'react';
import SearchResult from '../components/SearchResult'; 
import { fetchDataByName } from '../API/DataApi';


export const Search = () => {

    const [name, setName] = useState(""); 
    const [nameData, setNameData] = useState([]); 


    useEffect(() => {
        if (name) {
            const loadNameData = async () => {
                if (name) {
                    const getNameData = await fetchDataByName(name); 
                    setNameData(getNameData); 
                }
            };
            loadNameData(); 
        }

    }, [name]); 



    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Player Search</h1> 

            <input 
                type="text" 
                placeholder="Search..." 
                style={{ marginLeft:"25px", height:"30px", width:"500px" }}
                value={name}
                onChange={
                    (e) => [setName(e.target.value)]
                }>
            </input>

            <SearchResult nameData={nameData}/>

            <p>&nbsp;</p>
            <p>&nbsp;</p>

        </div>
    );
};




export default Search; 