from flask import Flask
from flask_cors import CORS
from PlayerStatsScraper import scrape_player_stats


app = Flask(__name__)
CORS(app)


@app.route("/<season>")
def get_player_stats(season): 
    
    pass
    