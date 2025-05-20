from flask import Flask
from flask_cors import CORS
from PlayerStatsScraper import scrape_player_stats
from StatsDBUpdater import update_player_stats_database
import requests



app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/playerData/<nflSeason>")
def get_player_stats(nflSeason): 

    data_types = ["passing", "rushing", "receiving", "defense", "kicking"]

    try:
        # Update each CSV
        for d in data_types:
            scrape_player_stats(data_type=d, season=nflSeason)

        # # Update database with each CSV
        # for d in data_types:
        #     update_player_stats_database(data_type=d)

        # print("Success")
        # return "Success"

        '''
        NEW APPROACH - instead of trying to update the database in Flask, I will create a specialized endpoint in the Spring Boot App
        that updates the database and call that endpoint right here.  
        '''

        # only calling 'passing' endpoint for now
        # requests.get(f"http://localhost:8081/api/v1/updateDB?database=player_stats&playerCategory=passing")
        
        # response = requests.get(f"http://127.0.0.1:8081/api/v1/updateDB?database=player_stats&playerCategory=passing")
        # print(response)

        '''
        NEWER APPROACH - since I can't seem to call the Spring Boot App from my Flask App, I will instead call the Flask endpoint from
        Spring Boot instead of my React Frontend, and call the specialized Spring Boot endpoint from my React Frontend 
        '''

        return "Success"

    
    except Exception as e:
        print(f"Failure, {e}")
        return "Failure"
    




if __name__ == "__main__":
    app.run(debug=True)
    