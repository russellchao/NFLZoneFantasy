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
        
        # PostgreSQL DB config
        db_config = {
            'dbname': 'nfl_data',
            'user': 'postgres',
            'password': 'password',
            'host': 'localhost',
            'port': 5432
        }

        # Update database with each CSV
        for d in data_types:
            update_player_stats_database(d, db_config)


        print("Success")
        return "Success"
    
    except Exception as e:
        print("Failure")
        return "Failure"
    




if __name__ == "__main__":
    app.run(debug=True)
    