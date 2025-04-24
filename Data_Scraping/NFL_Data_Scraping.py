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

    elif data_type == "defense": 
        limit = 400
        desired_stats = {
            "name_display": "Player", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "tackles_combined": "Tck", 
            "tackles_solo": "Solo", "tackles_assists": "Asst", "tackles_loss": "TFL", "sacks": "Sack", "pass_defended": "PBU",
            "def_int": "INT", "def_int_td": "INT TD", "fumbles_forced": "FF", "fumbles_rec": "FR", "fumbles_rec_td": "FRTD"
        }
        defensive_positions = {"DE", "LDE", "RDE", "DT", "LDT", "RDT", "NT", "LB", "ILB", "OLB", "LLB", "RLB", "MLB", "LILB", 
                "RILB", "LOLB", "ROLB", "CB", "LCB", "RCB", "S", "FS", "SS", "DB"
        }

    elif data_type == "kicking":
        limit = 35
        desired_stats = {
            "name_display": "Player", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "fga": "FGA", "fgm": "FGM",
            "fg_long": "Long", "xpa": "XPA", "xpm": "XPM", "kickoff": "KO", "kickoff_yds": "KOYds", "kickoff_tb": "TB"
        }



    players_data = [] 

    for row in rows[:limit]:
        if row.get("class") == ["thead"]:
            continue

        player_data = {}
        skip_row = False

        for stat_key, label in desired_stats.items():
            cell = row.find("td", {"data-stat": stat_key})

            # Skip row if a required field is missing
            if cell is None:
                skip_row = True  
                break
            player_data[label] = cell.text.strip()

            # Skip row if the player's position isn't a defensive position when extracting defense data
            if data_type == "defense" and stat_key == "pos" and player_data[label] not in defensive_positions:
                skip_row = True
                break

        if not skip_row:
            players_data.append(player_data)


    if data_type == "rushing" or data_type == "receiving":
        # Sort rushing and receiving data based on total yards
        # Pro Football Reference sorts that data based on rushing attempts/receptions by default
        players_data.sort(key=lambda x: int(x["Yds"].replace(",", "")), reverse=True)

    elif data_type == "defense":
        # Sort defense data based on total tackles
        players_data.sort(key=lambda x: int(x["Tck"].replace(",", "")), reverse=True)

    elif data_type == "kicking":
        # Sort defense data based on total field goals made
        players_data.sort(key=lambda x: int(x["FGM"].replace(",", "")), reverse=True)


    # Export player data to .csv file
    filename = f"Data_Scraping/{data_type}_stats.csv"

    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=list(players_data[0].keys()))
        writer.writeheader()                # write column headers
        writer.writerows(players_data)      # write player rows

    return 




















if __name__ == "__main__":

    scrape_data(data_type="passing")
    scrape_data(data_type="rushing")
    scrape_data(data_type="receiving")
    scrape_data(data_type="defense")
    scrape_data(data_type="kicking")


    