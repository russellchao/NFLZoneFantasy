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



def formatDate(date):
    monthNumToName = {1: "January", 2: "February", 9: "September", 10: "October", 11: "November", 12: "December"}

    theMonth = str() 
    theDay = str() 
    theYear = str()

    for i in range(len(date)):
        if i <= 3:
            theYear += date[i]
        elif 3 < i <= 5:
            theMonth += date[i]
        else:
            theDay += date[i]

    theMonth = monthNumToName.get(int(theMonth))

    if theDay[0] == '0':
        theDay = theDay[1] # e.g. Changes September 04 to September 4

    return f"{theMonth} {theDay}, {theYear}"






def get_schedule_data(year, week, seasonType):

    # Call the unofficial ESPN API to Retrieve Schedule Data
    espn_api_url = f"https://cdn.espn.com/core/nfl/schedule?xhr=1&year={year}&week={week}&seasontype={seasonType}"
    response = requests.get(espn_api_url)

    if (response.status_code != 200):
        print(int(response.headers["Retry-After"]))
        raise Exception(f"Failed to load ESPN page ({response.status_code})")
    
    data = response.json()
    content = data.get("content", {})
    schedule = content.get("schedule", {})

    # Write the schedule to a .json file
    with open("ScheduleOutput.json", "w") as file:
        json.dump(schedule, file, indent=4)






    # Testing Output
    if seasonType == 2:
        print(f"Week {week} {year} Schedule dates:\n")
    elif seasonType == 3:
        seasonKeys = {1: "Wild Card Round", 2: "Divisional Round", 3: "Conference Championships", 5: "Super Bowl"}
        print(f"{seasonKeys.get(week)} {year} dates:\n")

    

    for date in schedule:
        # each "date" follows the format of something like: YYYYMMDD (e.g. 20250904)

        # Properly format the date (e.g. 20250904 becomes September 4, 2025)
        fullDate = formatDate(date)
        
        print(f"Date: {fullDate}")

        gamesThisDate = schedule[date]
        for matchup in gamesThisDate.get("games"):

            # e.g. split "Buffalo Bills at New York Jets" to ['Buffalo Bills', 'New York Jets']
            matchupNameSplit = matchup.get("name").split(" at ") 

            





            # Attributes for both scheduled and finished games
            date = None # date only (exclude start time)
            awayTeam = matchupNameSplit[0]
            homeTeam = matchupNameSplit[1]
            # trying to figure out how to extract records


            




        print()



    

    
if __name__ == "__main__":

    # Test examples extracting the schedule (for seasonType: 1=preseason, 2=regular season, 3=playoffs) but idc about preseason
    # e.g. 
    #   get_schedule_data(2025, 1, 2) for Week 1 of 2025, 
    #   get_schedule_data(2024, 15, 2) for Week 15 of 2024, 
    #   get_schedule_data(2024, 5, 3) for Super Bowl of 2024-25 (Eagles 40, Chiefs 22)

    get_schedule_data(year=2024, week=5, seasonType=3)