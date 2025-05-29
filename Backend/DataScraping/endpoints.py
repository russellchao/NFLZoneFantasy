from flask import Flask
from flask_cors import CORS
from PlayerStatsData.PlayerStatsScraper import scrape_player_stats
from ScheduleData.GetScheduleData import get_schedule_data, write_schedule_csv


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/playerData/<nflSeason>")
def update_player_stats(nflSeason): 
    # Endpoint called from Spring Boot App that updates the player stats CSVs

    data_types = ["passing", "rushing", "receiving", "defense", "kicking"]

    try:
        # Update each CSV
        for d in data_types:
            scrape_player_stats(data_type=d, season=nflSeason)

        return "Success updating player stats data"

    except Exception as e:
        print(f"Failure, {e}")
        return "Failure updating player stats data"



@app.route("/scheduleData/<year>")
def update_schedule(year):
    # Retrieves all regular season and playoff matches of the given year 
    # schedule_csv.data should contain 285 rows (272 reg season + 13 playoff games) (excluding header) 

    all_matchups = []
    
    try:
        for i in range(1,24):
            # There are a total of 23 weeks (excluding preseason) in an NFL season, with week 23 being the Super Bowl

            week = i
            seasonType = 2

            if (week == 22):
                # Week 22 is the Pro Bowl so no need to extract game data from that week
                continue

            if (week > 18): 
                # This if statement obtains the proper week number when retrieving playoff games
                week -= 18
                seasonType = 3

            all_matchups += get_schedule_data(year, week, seasonType)


        # Write all matchups to the schedule CSV file
        write_schedule_csv(all_matchups)
        
        
        return "Success updating schedule data"
    
    except Exception as e:
        print(f"Failure, {e}")
        return "Failure updating schedule data"
        
    



    




if __name__ == "__main__":
    app.run(debug=True)
    