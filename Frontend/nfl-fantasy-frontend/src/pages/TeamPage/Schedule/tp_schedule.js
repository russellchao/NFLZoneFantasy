// Schedule component for team page

const boxStyle = {
    background: '#bdbdbd',
    margin: '1%',
    width: '48%',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '16px 0',
    boxSizing: 'border-box',
    fontFamily: 'Roboto Mono, sans-serif',
};

const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
};

const topRowStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginBottom: '60px',
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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.3em',
};


const Schedule = ({ schedule }) => {

    return (
        <>
            <h2 style={{ paddingLeft: '20px' }}>Schedule</h2>

            <p>&nbsp;</p>

            <div style={rowStyle}>
                {schedule.map((game, idx) => (
                    <div key={game.gameId || idx} style={boxStyle}>
                        <div style={topRowStyle}>
                        <span style={{ marginLeft: 16 }}>{game.weekNum}</span>
                        <span>{game.date}</span>
                        <span style={{ marginRight: 16 }}>{game.venue}</span>
                    </div>
                    <div style={teamsRowStyle}>
                        <span style={{ marginLeft: 16 }}>{game.awayTeam}</span>
                        <span style={{ marginRight: 16 }}>{game.homeTeam}</span>
                    </div>
                    <div style={recordsRowStyle}>
                        <span style={{ marginLeft: 16 }}>({game.awayTeamRecord})</span>
                        <span style={{ marginRight: 16 }}>({game.homeTeamRecord})</span>
                    </div>
                        <div style={statusRowStyle}>
                            {game.status && game.status.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>


            <p>&nbsp;</p>
            <p>&nbsp;</p>







        </>
    );




};


export default Schedule; 