from flask import Flask
from flask_cors import CORS
from PlayerStatsScraper import scrape_player_stats

app = Flask(__name__)
CORS(app)


@app.route("/playerData/<nflSeason>")
def get_player_stats(nflSeason): 

    try:
        scrape_player_stats(data_type="passing", season=nflSeason)
        scrape_player_stats(data_type="rushing", season=nflSeason)
        scrape_player_stats(data_type="receiving", season=nflSeason)
        scrape_player_stats(data_type="defense", season=nflSeason)
        scrape_player_stats(data_type="kicking", season=nflSeason)

        return "Success"
    
    except Exception as e:
        return "Failure"
    

if __name__ == "__main__":
    app.run(debug=True)
    