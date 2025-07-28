from flask import Flask
from flask_cors import CORS
from PlayerStatsData.PlayerStatsScraper import scrape_player_stats
from ScheduleData.GetScheduleData import get_schedule_data
from HotTakes.HotTakeValidator import validate_hot_take


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
    # Retrieves all preseason, regular season, and playoff matches of the given year 

    try:
        get_schedule_data(year)
        return "Success updating schedule data"
    
    except Exception as e:
        print(f"Failure, {e}")
        return "Failure updating schedule data"
        


@app.route("/validateHotTake/<hotTake>/<stringOfHotTakes>")
def validate(hotTake, stringOfHotTakes):
    # Returns a string indicating whether the hot take is valid or not

    try:
        listOfHotTakes = stringOfHotTakes.split(",")
        result = validate_hot_take(hotTake, listOfHotTakes)
        return result
    
    except Exception as e:
        print(f"Failure, {e}")
        return "Failure validating hot take"

    




if __name__ == "__main__":
    app.run(debug=True)
    