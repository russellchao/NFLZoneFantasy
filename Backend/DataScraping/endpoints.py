from flask import Flask
from flask_cors import CORS
from PlayerStatsData.PlayerStatsScraper import scrape_player_stats


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/playerData/<nflSeason>")
def get_player_stats(nflSeason): 
    # Endpoint called from Spring Boot App that updates the player stats CSVs

    data_types = ["passing", "rushing", "receiving", "defense", "kicking"]

    try:
        # Update each CSV
        for d in data_types:
            scrape_player_stats(data_type=d, season=nflSeason)

        return "Success"

    except Exception as e:
        print(f"Failure, {e}")
        return "Failure"
    




if __name__ == "__main__":
    app.run(debug=True)
    