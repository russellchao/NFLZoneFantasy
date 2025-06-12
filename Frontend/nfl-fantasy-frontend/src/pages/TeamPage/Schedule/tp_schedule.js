// Schedule component for team page

import GameFinal from '../../Components/Schedule/game_final';
import GameScheduled from '../../Components/Schedule/game_scheduled';

const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
};

const Schedule = ({ schedule, viewingMatchupInfo, setViewingMatchupInfo, matchToViewInfo, setMatchToViewInfo }) => {

    /*
    I am trying to find a way to extract the record and division placement for the team, but the current API endpoint is not working
    */

    // const [record, setRecord] = useState("0-0"); // team's current or final record (0-0 by default)
    // const [placement, setPlacement] = useState("N/A"); // team's placement in division

    // // Get info about record and division placement if applicable 
    // (async () => {
    //     try {
    //         const response = await fetch(
    //             `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2025/teams/${teamId}/record`
    //         );

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`)
    //         }

    //         const data = await response.json(); 
    //         console.log(data); 
            
            

    //     } catch (error) {
    //         console.error("Failed to fetch matchup info data:", error);
    //     }
    // })();


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