import React from 'react'; 


export const Search = () => {

    let name = ""; 

    return (
        <div>
            <h1 style={{ paddingLeft: '20px' }}>Player Search</h1> 
            <input type="text" placeholder="Search..." style={{ marginLeft:"25px", height:"30px", width:"500px" }}></input>
            <button type='submit' style={{ height:"37px", width:"100px", backgroundColor:"#7FFFD4" }}>Submit</button>
        </div>
    );
};




export default Search; 