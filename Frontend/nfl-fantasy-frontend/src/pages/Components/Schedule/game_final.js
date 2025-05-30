import React from 'react';


const boxStyle = {
    background: '#b3cccc',
    margin: '1%',
    width: '48%',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '16px 0',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
};

const topRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginBottom: '40px',
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

const scoresRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2.5em',
    fontWeight: 'bold',
    gap: '200px',  
    marginBottom: '12px',
    padding: '0 16px', 
};

const statusRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.3em',
};

const losingStyle = {
    color: '#666666'
};

const GameFinal = ({ game }) => {
    return (
        <div style={boxStyle}>
            <div style={topRowStyle}>
                <span style={{ marginLeft: 16 }}>{game.weekNum}</span>
                <span>{game.date}</span>
                <span style={{ marginRight: 16 }}>{game.venue}</span>
            </div>
            <div style={teamsRowStyle}>
                <span style={{ 
                    marginLeft: 16,
                    ...(parseInt(game.awayTeamScore) < parseInt(game.homeTeamScore) ? losingStyle : {})
                }}>{game.awayTeam}</span>
                <span style={{ 
                    marginRight: 16,
                    ...(parseInt(game.homeTeamScore) < parseInt(game.awayTeamScore) ? losingStyle : {})
                }}>{game.homeTeam}</span>
            </div>
            <div style={recordsRowStyle}>
                <span style={{ 
                    marginLeft: 16,
                    ...(parseInt(game.awayTeamScore) < parseInt(game.homeTeamScore) ? losingStyle : {})
                }}>({game.awayTeamRecord})</span>
                <span style={{ 
                    marginRight: 16,
                    ...(parseInt(game.homeTeamScore) < parseInt(game.awayTeamScore) ? losingStyle : {})
                }}>({game.homeTeamRecord})</span>
            </div>
            <div style={scoresRowStyle}>
                <span style={parseInt(game.awayTeamScore) < parseInt(game.homeTeamScore) ? losingStyle : {}}>
                    {game.awayTeamScore}
                </span>
                <span style={parseInt(game.homeTeamScore) < parseInt(game.awayTeamScore) ? losingStyle : {}}>
                    {game.homeTeamScore}
                </span>
            </div>
            <div style={statusRowStyle}>
                {game.overtime ? 'FINAL/OT' : 'FINAL'}
            </div>
        </div>
    );
};

export default GameFinal;