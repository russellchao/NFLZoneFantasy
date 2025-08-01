// Schedule component for team page

import GameFinal from '../../Components/Schedule/game_final';
import GameScheduled from '../../Components/Schedule/game_scheduled';
import GameInProgress from '../../Components/Schedule/game_in_progress';

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
                    : game.status === 'Scheduled'
                        ?
                        <GameScheduled
                            key = {game.gameId || idx} 
                            game = {game} 
                            onClick = {() => {
                                window.scrollTo(0, 0);
                                setViewingMatchupInfo(true);
                                setMatchToViewInfo(game);
                            }}
                        />
                    : game.status === 'In Progress'
                        ?
                        <GameInProgress
                            key = {game.gameId || idx} 
                            game = {game} 
                            onClick = {() => {
                                window.scrollTo(0, 0);
                                setViewingMatchupInfo(true);
                                setMatchToViewInfo(game);
                            }}
                        />
                    : <></>
                ))}
            </div>
        </>
    );
};

export default Schedule;