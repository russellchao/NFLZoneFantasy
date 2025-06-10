import React from 'react';

// Import all logo images
const logoImages = require.context('../../../logos', false, /\.(png|jpe?g|svg)$/);

// Create a mapping of team abbreviations to logo paths
const teamLogos = {};
logoImages.keys().forEach(key => {
    // Remove './' from the start and file extension from the end
    const teamAbbr = key.replace(/^\.\//, '').replace(/\.(png|jpe?g|svg)$/, '');
    teamLogos[teamAbbr] = logoImages(key);
});

const boxStyle = {
    background: '#b3fff0',
    margin: '1%',
    width: '48%',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '16px 0',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
    border: '2px solid black',  
    borderRadius: '4px'
};

const topRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginBottom: '40px',
};

const logoStyle = {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    verticalAlign: 'middle'
};

const teamsRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.5em',
    marginBottom: '6px',
};

const recordsRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.1em',
    marginBottom: '18px',
};

const statusRowStyle = {
    width: '80%',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 16px', 
    fontWeight: 'bold',
    fontSize: '1.3em',
    marginLeft: '50px'
};

const buttonContainerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '12x',
    paddingRight: '16px'
};

const buttonStyle = {
    padding: '1px 10px',
    backgroundColor: '#004d4d',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.7em',
    fontFamily: 'Segoe UI, sans-serif'
};

const GameScheduled = ({ game, onClick }) => {

    return (
        <div style={boxStyle}>
            <div style={topRowStyle}>
                <span style={{ marginLeft: 16 }}>{game.weekNum}</span>
                <span>{game.date}</span>
                <span style={{ marginRight: 16 }}>{game.venue}</span>
            </div>
            <div style={teamsRowStyle}>
                <span style={{ marginLeft: 16 }}>
                    <img 
                        src={teamLogos[game.awayTeam]} 
                        alt={`${game.awayTeam} logo`} 
                        style={logoStyle}
                    />
                    {game.awayTeam}
                </span>
                <span style={{ marginRight: 16 }}>
                    <img 
                        src={teamLogos[game.homeTeam]} 
                        alt={`${game.homeTeam} logo`} 
                        style={logoStyle}
                    />
                    {game.homeTeam}
                </span>
            </div>
            <div style={recordsRowStyle}>
                <span style={{ marginLeft: 16 }}>({game.awayTeamRecord})</span>
                <span style={{ marginRight: 16 }}>({game.homeTeamRecord})</span>
            </div>
            <div style={statusRowStyle}>
                {`${game.status.toUpperCase()} • ${game.startTime} • ${game.broadcast}`}

                <button 
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#006666'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#004d4d'}
                    onClick={(e) => onClick(e.target.value)}
                >
                    Game Info
                </button>
            </div>
        </div>
    );
};

export default GameScheduled;