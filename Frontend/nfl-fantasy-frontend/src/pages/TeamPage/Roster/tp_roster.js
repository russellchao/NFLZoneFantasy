const boxStyle = {
    background: '#b3fff0',
    margin: '0%',
    width: '90%',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0px 0',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
    border: '2px solid black',  
    borderRadius: '4px'
};

const Roster = ({ teamName, teamSeason, rosterInfo }) => {

    const groupPlayersByPosition = (athletes) => {
        const grouped = {};
        if (athletes) {
            // Iterate through each section (offense, defense, specialTeam)
            athletes.forEach(section => {
                if (section.items) {
                    section.items.forEach(player => {
                        const position = player.position?.abbreviation || 'N/A';
                        if (!grouped[position]) {
                            grouped[position] = [];
                        }
                        grouped[position].push(player);
                    });
                }
            });
        }
        return grouped;
    };


    // I specifically want the first four positions listed in the following order: QB, RB, WR, TE. Everything else is fine
    const firstFourPositions = ['QB', 'RB', 'WR', 'TE'];


    return (
        <div style={{ paddingLeft: '20px' }}>
            {rosterInfo.athletes && (() => {
                const grouped = groupPlayersByPosition(rosterInfo.athletes);
                const orderedPositions = [
                    ...firstFourPositions,
                    ...Object.keys(grouped).filter(pos => !firstFourPositions.includes(pos))
                ];
                
                return (
                    <div style={boxStyle}>
                        <div style={{ 
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '1px',
                            width: '100%',
                            fontSize: '1.1em',
                            paddingLeft: '50px'
                        }}>
                            {orderedPositions.map(position => (
                                grouped[position] && (
                                    <div key={position} style={{ 
                                        marginBottom: '20px',
                                        minWidth: '200px'
                                    }}>
                                        <h3>{position}</h3>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            padding: 0,
                                            margin: 0
                                        }}>
                                            {grouped[position].map(player => (
                                                <li key={player.id} style={{ 
                                                    marginBottom: '5px',
                                                    fontSize: '0.9em'
                                                }}>
                                                    {player.fullName} - #{player.jersey || 'N/A'}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default Roster; 