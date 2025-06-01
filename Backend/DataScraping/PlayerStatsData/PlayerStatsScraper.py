from bs4 import BeautifulSoup
from bs4 import Comment
import pandas as pd
import requests 
import time
import csv


def scrape_player_stats(data_type, season):

    print(f"Scraping {data_type} data for {season}")

    # Send a GET request to the stats page URL
    response = requests.get(f"https://www.pro-football-reference.com/years/{season}/{data_type}.htm")
    if response.status_code != 200:
        print(int(response.headers["Retry-After"]))
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
            "name_display": "Name", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "pass_cmp": "Cmp", 
            "pass_att": "Att", "pass_cmp_pct": "Cmp%", "pass_yds": "Yds", "pass_td": "TD", "pass_int": "Int", "pass_long": "Long",
            "pass_yds_per_g": "Y/G", "pass_rating": "Rate", "qbr": "QBR", "pass_sacked": "Sack"
        }

    elif data_type == "rushing":
        limit = 200
        desired_stats = {
            "name_display": "Name", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "rush_att": "Att",
            "rush_yds": "Yds", "rush_td": "TD", "rush_long": "Long", "rush_yds_per_g": "Y/G", "fumbles": "Fmb"
        }

    elif data_type == "receiving":
        limit = 200
        desired_stats = {
            "name_display": "Name", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "rec": "Rec",
            "rec_yds": "Yds", "rec_td": "TD", "rec_long": "Long", "rec_yds_per_g": "Y/G", "fumbles": "Fmb"
        }

    elif data_type == "defense": 
        limit = 700
        desired_stats = {
            "name_display": "Name", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "tackles_combined": "Tck", 
            "tackles_solo": "Solo", "tackles_assists": "Asst", "tackles_loss": "TFL", "sacks": "Sack", "pass_defended": "PBU",
            "def_int": "INT", "def_int_td": "INT TD", "fumbles_forced": "FF", "fumbles_rec": "FR", "fumbles_rec_td": "FRTD"
        }
        defensive_positions = {"DE", "LDE", "RDE", "DT", "LDT", "RDT", "NT", "LB", "ILB", "OLB", "LLB", "RLB", "MLB", "LILB", 
                "RILB", "LOLB", "ROLB", "CB", "LCB", "RCB", "S", "FS", "SS", "DB", "EDGE"
        }

    elif data_type == "kicking":
        limit = 35
        desired_stats = {
            "name_display": "Name", "age": "Age", "team_name_abbr": "Team", "pos": "Pos", "games": "G", "fga": "FGA", "fgm": "FGM",
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
    filename = f"PlayerStatsData/{data_type}_stats.csv"

    # # DEBUG
    # print(players_data)

    try:
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=list(players_data[0].keys()))
            writer.writeheader()                # write column headers
            writer.writerows(players_data)      # write player rows
    except Exception as e:
        print(f"PLAYER STATS DATA FILE WRITE ERROR ({data_type}):", e)


    return 





    print(f"Scraping {data_type} data for {season} for team {team_name}")

    # Send a GET request to the stats page URL
    response = requests.get(f"https://www.pro-football-reference.com/years/{season}/{data_type}.htm")
    if response.status_code != 200:
        print(int(response.headers["Retry-After"]))
        raise Exception(f"Failed to load page ({response.status_code})")

    # Parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")

    # Find the table directly
    table = soup.find("table", id=data_type)
    if table is None:
        raise Exception("ERROR: Couldn't find the requested table.")
    
    # Debug: Print total rows before filtering
    all_rows = table.tbody.find_all("tr")
    print(f"Total rows before filtering: {len(all_rows)}")

    # First filter rows by team to reduce processing
    rows = [row for row in table.tbody.find_all("tr") 
            if row.get("class") != ["thead"] 
            and row.find("td", {"data-stat": "team_name_abbr"}) 
            and row.find("td", {"data-stat": "team_name_abbr"}).text.strip() == team_name]

    # Debug: Print filtered rows
    print(f"Rows after team filtering: {len(rows)}")
    
    # Debug: Print team names found for verification
    teams_found = set(row.find("td", {"data-stat": "team_name_abbr"}).text.strip() 
                     for row in table.tbody.find_all("tr") 
                     if row.find("td", {"data-stat": "team_name_abbr"}))
    print(f"Teams found in data: {sorted(teams_found)}")
    print(f"Looking for team: {team_name}")

    # Set smaller limits since we're only looking at one team
    position_limits = {
        "passing": 4,    # Most teams only have 2-3 QBs
        "rushing": 8,    # Running backs and occasional QB/WR rushers
        "receiving": 12, # Main receivers and tight ends
        "defense": 30,   # Main defensive players
        "kicking": 2     # Usually 1 kicker per team
    }
    limit = position_limits.get(data_type, 30)

    # Retreive player data with pre-filtered rows
    desired_stats = get_desired_stats(data_type)
    defensive_positions = get_defensive_positions() if data_type == "defense" else None

    players_data = []
    for row in rows[:limit]:
        player_data = {}
        skip_row = False

        for stat_key, label in desired_stats.items():
            cell = row.find("td", {"data-stat": stat_key})
            if cell is None:
                skip_row = True
                break
            player_data[label] = cell.text.strip()

            if (data_type == "defense" and 
                stat_key == "pos" and 
                player_data[label] not in defensive_positions):
                skip_row = True
                break

        if not skip_row:
            players_data.append(player_data)

    if not players_data:
        print(f"No {data_type} data found for {team_name}")
        return

    # Sort data based on type
    sort_player_data(players_data, data_type)

    # Export player data to .csv file
    filename = f"PlayerStatsData/{data_type}_stats.csv"
    
    try:
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=list(players_data[0].keys()))
            writer.writeheader()
            writer.writerows(players_data)
    except Exception as e:
        print(f"PLAYER STATS DATA FILE WRITE ERROR ({data_type}):", e)


    return 






# if __name__ == "__main__":

#     # Used for testing in terminal only. Will be replaced by Flask App endpoint. 

#     data_types = ["passing", "rushing", "receiving", "defense", "kicking"]

#     for d in data_types:

#         # scrape_player_stats(data_type=d, season="2024")

    


    