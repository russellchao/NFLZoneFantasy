from concurrent.futures import ThreadPoolExecutor
import requests 
import json
import csv

csvFilename = f"ScheduleData/schedule_data.csv"


def formatDate(date):
    monthNumToName = {1: "January", 2: "February", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}

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


def write_schedule_csv_header():
    header = ['Date', 'WeekNum', 'Status', 'AwayTeam', 'AwayTeamRecord', 'HomeTeam', 'HomeTeamRecord', 
              'Venue', 'Broadcast', 'SeasonType', 'WeekId', 'GameId', 'AwayTeamScore', 'HomeTeamScore', 'Overtime', 'StartTime']
    try:
        with open(csvFilename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=header)
            writer.writeheader()
    except Exception as e:
        print(f"SCHEDULE DATA FILE WRITE ERROR:", e)


def write_schedule_csv(matchupData):
    header = ['Date', 'WeekNum', 'Status', 'AwayTeam', 'AwayTeamRecord', 'HomeTeam', 'HomeTeamRecord', 
              'Venue', 'Broadcast', 'SeasonType', 'WeekId', 'GameId', 'AwayTeamScore', 'HomeTeamScore', 'Overtime', 'StartTime']
    try:
        with open(csvFilename, mode="a", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=header)
            writer.writerows(matchupData)
    except Exception as e:
        print(f"SCHEDULE DATA FILE WRITE ERROR:", e)


def get_matches_this_week(year, week, seasonType):
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


    # Week numbers mapped to their respective rounds for the preseason and playoffs
    preseasonKeys = {1: "Hall of Fame Week", 2: "Preseason Week 1", 3: "Preseason Week 2", 4: "Preseason Week 3"}
    playoffKeys = {1: "Wild Card Round", 2: "Divisional Round", 3: "Conference Championships", 4: "Pro Bowl", 5: "Super Bowl"}


    # Loop through the .json output to retreieve each matchup for the given week
    # each "date" follows the format of something like: YYYYMMDD (e.g. 20250904)
    for date in schedule:

        gamesThisDate = schedule[date]

        for matchup in gamesThisDate.get("games"):

            ###### Attributes for games ######

            # date only (exclude start time)
            fullDate = formatDate(date) # (e.g. 20250904 becomes September 4, 2025)


            # week number 
            weekInText = matchup.get("week").get("number")
            weekNum = "Week " + str(weekInText)
            # if it's the playoffs or preseason, retrieve the appropriate round given the week
            if seasonType == 3:
                weekNum = playoffKeys.get(int(weekInText), f"Week {weekInText}")
            if seasonType == 1:
                weekNum = preseasonKeys.get(int(weekInText), f"Week {weekInText}")


            # check if the status of a game is scheduled or finished (in the future I will try my best to scrape live games)
            status = matchup.get("competitions")[0].get("status").get("type").get("description")


            # home and away teams
            matchupNameSplit = matchup.get("name").split(" at ") # e.g. split "Buffalo Bills at New York Jets" to ['Buffalo Bills', 'New York Jets']
            awayTeam = matchupNameSplit[0]
            homeTeam = matchupNameSplit[1]


            # home and away team's regular season records 
            #NOTE: in the offseason, ESPN does not count records for teams, so the record will be defaulted to 0-0
            # I think once the regular season starts, each team's records will be available in Scheduled games
            awayTeamRecord = "0-0"
            homeTeamRecord = "0-0"
            if status == "Final" and seasonType != 1:
                awayTeamRecord = matchup.get("competitions")[0].get("competitors")[1].get("records")[0].get("summary")
                homeTeamRecord = matchup.get("competitions")[0].get("competitors")[0].get("records")[0].get("summary")


            # venue info
            if (matchup.get("competitions")[0].get("venue") == None):
                # namely used for playoff games that are TBD
                fullVenue = "TBD"
            else:
                stadium = matchup.get("competitions")[0].get("venue").get("fullName")
                city = matchup.get("competitions")[0].get("venue").get("address").get("city")
                state = matchup.get("competitions")[0].get("venue").get("address").get("state")
                country = matchup.get("competitions")[0].get("venue").get("address").get("country")
                fullVenue = f"{stadium}, {city}, {state}, {country}"

            
            # broadcast channel
            broadcast = matchup.get("competitions")[0].get("broadcast")
            if broadcast == "":
                broadcast = "TBD"


            # game ID (for Java Entity Primary Key)
            gameId = matchup.get("competitions")[0].get("id")


            # away team and home team scores (for Final games only)
            awayTeamScore = -1
            homeTeamScore = -1
            if status == "Final":
                awayTeamScore = int(matchup.get("competitions")[0].get("competitors")[1].get("score"))
                homeTeamScore = int(matchup.get("competitions")[0].get("competitors")[0].get("score"))


            # check if a finished game went into overtime (need to use lowercase "true" or "false" for Java)
            overtime = "false"
            if status == "Final" and matchup.get("competitions")[0].get("status").get("type").get("detail") == "Final/OT":
                overtime = "true"


            # add the game's start time if the game's status is "Scheduled
            start_time = "N/A"
            if status == "Scheduled":
                start_time_detail = matchup.get("status").get("type").get("detail").split(" ") 
                if start_time_detail[2] == "TBD":
                    start_time = "TBD"
                else:
                    start_time = start_time_detail[4] + " " + start_time_detail[5] + " " + start_time_detail[6]


            # Organize the matchup data into a dictionary
            matchup_data = {'Date': fullDate, 'WeekNum': weekNum, 'Status': status, 'AwayTeam': awayTeam, 
                            'AwayTeamRecord': awayTeamRecord, 'HomeTeam': homeTeam, 'HomeTeamRecord': homeTeamRecord, 
                            'Venue': fullVenue, 'Broadcast': broadcast, 'SeasonType': seasonType, 'WeekId': week, 'GameId': gameId,
                            'AwayTeamScore': awayTeamScore, 'HomeTeamScore': homeTeamScore, 'Overtime': overtime, 'StartTime': start_time} 
            

            # Write the matchup data to the schedule CSV file
            write_schedule_csv([matchup_data])
    

def get_schedule_data(year):

    # Write the CSV header for the schedule data file
    write_schedule_csv_header()

    # Instead of using for loops for each season type and week, we can use a ThreadPoolExecutor to parallelize the requests
    # This will speed up the process significantly, especially for the regular season with 18 weeks

    preseason_weeks = [(year, x, 1) for x in range(1, 5)]  # Preseason weeks 1-4
    regular_season_weeks = [(year, x, 2) for x in range(1, 19)]  # Regular season weeks 1-18
    playoff_weeks = [(year, x, 3) for x in [1, 2, 3, 5]] # Playoffs: Wild Card, Divisional, Conference Championships, Super Bowl

    weeks = preseason_weeks + regular_season_weeks + playoff_weeks

    with ThreadPoolExecutor(max_workers=8) as executor:
        executor.map(lambda args: get_matches_this_week(*args), weeks)

