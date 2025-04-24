##importing all required libraries
from bs4 import BeautifulSoup
from bs4 import Comment
import pandas as pd
import requests 
import time
import csv
import os


year = 2024



def scrape_data(data_type):
    # Send a GET request to the stats page URL
    response = requests.get(f"https://www.pro-football-reference.com/years/{year}/{data_type}.htm")
    if response.status_code != 200:
        raise Exception(f"Failed to load page ({response.status_code})")

    # Parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")

    # Find the table directly
    table = soup.find("table", id=data_type)
    if table is None:
        raise Exception("ERROR: Couldn't find the requested table.")

    # Extract player rows
    rows = table.tbody.find_all("tr")

    # Retreive player data 
    if data_type == "passing":
        limit = 60
        desired_stats = {
            "name_display": "Player", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "pass_cmp": "Cmp", 
            "pass_att": "Att", "pass_cmp_pct": "Cmp%", "pass_yds": "Yds", "pass_td": "TD", "pass_int": "Int", "pass_long": "Long",
            "pass_yds_per_g": "Y/G", "pass_rating": "Rate", "qbr": "QBR", "pass_sacked": "Sack"
        }
    elif data_type == "rushing":
        limit = 200
        desired_stats = {
            "name_display": "Player", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "rush_att": "Att",
            "rush_yds": "Yds", "rush_td": "TD", "rush_long": "Long", "rush_yds_per_g": "Y/G", "fumbles": "Fmb"
        }
    elif data_type == "receiving":
        limit = 200
        desired_stats = {
            "name_display": "Player", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "rec": "Rec",
            "rec_yds": "Yds", "rec_td": "TD", "rec_long": "Long", "rec_yds_per_g": "Y/G", "fumbles": "Fmb"
        }

    players_data = [] 

    for row in rows[:limit]:
        if row.get("class") == ["thead"]:
            continue

        player_data = {}
        skip_row = False

        for stat_key, label in desired_stats.items():
            cell = row.find("td", {"data-stat": stat_key})
            if cell is None:
                skip_row = True  # Skip row if a required field is missing
                break
            player_data[label] = cell.text.strip()

        if not skip_row:
            players_data.append(player_data)


    # Sort rushing and receiving data based on total yards
    # Pro Football Reference sorts that data based on rushing attempts/receptions by default
    if (data_type == "rushing" or data_type == "receiving"):
        players_data.sort(key=lambda x: int(x["Yds"].replace(",", "")), reverse=True)


    # Export player data to .csv file
    filename = f"Data_Scraping/{data_type}_stats.csv"

    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=list(players_data[0].keys()))
        writer.writeheader()                # write column headers
        writer.writerows(players_data)      # write player rows

    return 








# Scrape defense data
def scrape_defense_data(filename):
    pass







# Scrape special teams data 
def scrape_special_teams_data(filename):
    pass







if __name__ == "__main__":

    scrape_data(data_type="passing")
    scrape_data(data_type="rushing")
    scrape_data(data_type="receiving")

    