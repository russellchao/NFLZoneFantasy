// Schedule component for team page

import GameFinal from '../../Components/Schedule/game_final';
import GameScheduled from '../../Components/Schedule/game_scheduled';

const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
};

const Schedule = ({ schedule, setViewingMatchupInfo, setMatchToViewInfo }) => {

    return (
        <>
            <div style={rowStyle}>
                {schedule.map((game, idx) => (
                    game.status === 'Final' 
                        ? <GameFinal 
                            key={game.gameId || idx} 
                            game={game}
                            onClick = {() => {
                                window.scrollTo(0, 0);
                                setViewingMatchupInfo(true);
                                setMatchToViewInfo(game);
                            }} 
                        />
                        : <GameScheduled 
                            key={game.gameId || idx} 
                            game={game} 
                            onClick = {() => {
                                window.scrollTo(0, 0);
                                setViewingMatchupInfo(true);
                                setMatchToViewInfo(game);
                            }}
                        />
                ))}
            </div>
        </>
    );
};

export default Schedule;