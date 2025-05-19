from flask import Flask
from flask_cors import CORS
from PlayerStatsScraper import scrape_player_stats
from StatsDBUpdater import update_player_stats_database



app = Flask(__name__)
CORS(app)


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
        NEW APPROACH - instead of trying to update the database here, I will create a specialized endpoint in the Spring Boot App
        that updates the database and call that endpoint right here.  
        '''

        





    
    except Exception as e:
        print("Failure")
        return "Failure"
    




if __name__ == "__main__":
    app.run(debug=True)
    