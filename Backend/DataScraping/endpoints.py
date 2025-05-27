from flask import Flask
from flask_cors import CORS
from PlayerStatsData.PlayerStatsScraper import scrape_player_stats
from ScheduleData.GetScheduleData import get_schedule_data


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



@app.route("/schedule/<year>/<week>/<seasonType>")
def update_schedule(year, week, seasonType):
    # Updates the schedule CSV based on the provided year, week and season type (2 for reg season, 3 for playoffs)

    try:
        get_schedule_data(year, week, seasonType)
        return "Success updating schedule data"
    
    except Exception as e:
        print(f"Failure, {e}")
        return "Failure updating schedule data"
        
    



    




if __name__ == "__main__":
    app.run(debug=True)
    