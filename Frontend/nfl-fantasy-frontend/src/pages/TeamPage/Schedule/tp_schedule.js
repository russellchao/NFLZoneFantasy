// Schedule component for team page

import React from 'react';
import GameFinal from '../../Components/Schedule/game_final';
import GameScheduled from '../../Components/Schedule/game_scheduled';

const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
};

const Schedule = ({ schedule }) => {
    return (
        <>
            <div style={rowStyle}>
                {schedule.map((game, idx) => (
                    game.status === 'Final' 
                        ? <GameFinal key={game.gameId || idx} game={game} />
                        : <GameScheduled key={game.gameId || idx} game={game} />
                ))}
            </div>
        </>
    );
};

export default Schedule;