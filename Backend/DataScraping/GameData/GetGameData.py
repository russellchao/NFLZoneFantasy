from bs4 import BeautifulSoup
from bs4 import Comment
import pandas as pd
import requests 
import json
import time
import csv


def getGameData2025Week1():

    #EXAMPLE: Extracting the Week 1 Schedule for the 2025-26 NFL Season using an unofficial ESPN API
    espn_api_url = "https://cdn.espn.com/core/nfl/schedule?xhr=1&year=2025&week=1"

    response = requests.get(espn_api_url)

    if (response.status_code != 200):
        print(int(response.headers["Retry-After"]))
        raise Exception(f"Failed to load ESPN page ({response.status_code})")
    
    data = response.json()
    content = data.get("content", {})
    schedule = content.get("schedule", {})

    with open("Week1_2025.json", "w") as file:
        json.dump(schedule, file, indent=4)

    print("Week 1 2025 Schedule dates:")
    for date in schedule:
        # each "date" follows the format of something like: YYYYMMDD (e.g. 20250904)
        print(f"Date: {date}")

        gamesThisDate = schedule[date]
        for matchup in gamesThisDate.get("games"):
            print(matchup.get("name"))


def getGameData2024Week15():

    #EXAMPLE: Extracting the Week 15 Schedule for the 2024-25 NFL Season using an unofficial ESPN API
    espn_api_url = "https://cdn.espn.com/core/nfl/schedule?xhr=1&year=2024&week=15"

    response = requests.get(espn_api_url)

    if (response.status_code != 200):
        print(int(response.headers["Retry-After"]))
        raise Exception(f"Failed to load ESPN page ({response.status_code})")

    data = response.json()
    content = data.get("content", {})
    schedule = content.get("schedule", {})

    with open("Week15_2024.json", "w") as file:
        json.dump(schedule, file, indent=4)

    print("Week 15 2024 Schedule dates:")
    for date in schedule:
        # each "date" follows the format of something like: YYYYMMDD (e.g. 20250904)
        print(f"Date: {date}")

        gamesThisDate = schedule[date]
        for matchup in gamesThisDate.get("games"):
            print(matchup.get("name"))

    
        





    

    
    
    






if __name__ == "__main__":

    # Test extracting the schedule
    getGameData2025Week1()
    getGameData2024Week15()