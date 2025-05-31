import requests 
import json
import time
import csv


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


def write_schedule_csv(allMatchups):
    csvFilename = f"ScheduleData/schedule_data.csv"
    header = ['Date', 'WeekNum', 'Status', 'AwayTeam', 'AwayTeamRecord', 'HomeTeam', 'HomeTeamRecord', 
              'Venue', 'Broadcast', 'SeasonType', 'WeekId', 'GameId', 'AwayTeamScore', 'HomeTeamScore', 'Overtime', 'StartTime']
    try:
        with open(csvFilename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=header)
            writer.writeheader()
            writer.writerows(allMatchups)     
    except Exception as e:
        print(f"SCHEDULE DATA FILE WRITE ERROR:", e)


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


    # Week numbers mapped to their respective rounds for the playoffs
    playoffKeys = {1: "Wild Card Round", 2: "Divisional Round", 3: "Conference Championships", 5: "Super Bowl"}


    # Loop through the .json output to retreieve each matchup for the given week
    # each "date" follows the format of something like: YYYYMMDD (e.g. 20250904)
    allMatchupsThisWk = []
    for date in schedule:

        gamesThisDate = schedule[date]

        for matchup in gamesThisDate.get("games"):

            ###### Attributes for games ######

            # date only (exclude start time)
            fullDate = formatDate(date) # (e.g. 20250904 becomes September 4, 2025)


            # week number 
            weekInText = matchup.get("week").get("number")
            weekNum = "Week " + str(weekInText)
            if seasonType == 3:
                # if it's the playoffs, retrieve the appropriate round given the week
                weekNum = playoffKeys.get(int(weekInText), f"Week {weekInText}")


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

            if status == "Final":
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
                #print(start_time_detail)
                if start_time_detail[2] == "TBD":
                    start_time = "TBD"
                else:
                    start_time = start_time_detail[4] + " " + start_time_detail[5] + " " + start_time_detail[6]


            # Add this matchup to the matchups this week list
            matchup_data = {'Date': fullDate, 'WeekNum': weekNum, 'Status': status, 'AwayTeam': awayTeam, 
                            'AwayTeamRecord': awayTeamRecord, 'HomeTeam': homeTeam, 'HomeTeamRecord': homeTeamRecord, 
                            'Venue': fullVenue, 'Broadcast': broadcast, 'SeasonType': seasonType, 'WeekId': week, 'GameId': gameId,
                            'AwayTeamScore': awayTeamScore, 'HomeTeamScore': homeTeamScore, 'Overtime': overtime, 'StartTime': start_time} 
            allMatchupsThisWk.append(matchup_data)
            

    # Return each matchup from this week to the schedule CSV file
    return allMatchupsThisWk
    

def get_schedule_data_by_week(year, week, seasonType):

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


    # Week numbers mapped to their respective rounds for the playoffs
    playoffKeys = {1: "Wild Card Round", 2: "Divisional Round", 3: "Conference Championships", 5: "Super Bowl"}


    # Loop through the .json output to retreieve each matchup for the given week
    # each "date" follows the format of something like: YYYYMMDD (e.g. 20250904)
    allMatchupsThisWk = []
    for date in schedule:

        gamesThisDate = schedule[date]

        for matchup in gamesThisDate.get("games"):

            ###### Attributes for games ######

            # date only (exclude start time)
            fullDate = formatDate(date) # (e.g. 20250904 becomes September 4, 2025)


            # week number 
            weekInText = matchup.get("week").get("number")
            weekNum = "Week " + str(weekInText)
            if seasonType == 3:
                # if it's the playoffs, retrieve the appropriate round given the week
                weekNum = playoffKeys.get(int(weekInText), f"Week {weekInText}")


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

            if status == "Final":
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
                #print(start_time_detail)
                if start_time_detail[2] == "TBD":
                    start_time = "TBD"
                else:
                    start_time = start_time_detail[4] + " " + start_time_detail[5] + " " + start_time_detail[6]


            # Add this matchup to the matchups this week list
            matchup_data = {'Date': fullDate, 'WeekNum': weekNum, 'Status': status, 'AwayTeam': awayTeam, 
                            'AwayTeamRecord': awayTeamRecord, 'HomeTeam': homeTeam, 'HomeTeamRecord': homeTeamRecord, 
                            'Venue': fullVenue, 'Broadcast': broadcast, 'SeasonType': seasonType, 'WeekId': week, 'GameId': gameId,
                            'AwayTeamScore': awayTeamScore, 'HomeTeamScore': homeTeamScore, 'Overtime': overtime, 'StartTime': start_time} 
            allMatchupsThisWk.append(matchup_data)
            

    # Return each matchup from this week to the schedule CSV file
    write_schedule_csv(allMatchupsThisWk)



def get_schedule_data_by_team(year, teamCode):


    # Call the unofficial ESPN API to Retrieve Schedule Data
    allMatchupsThisTeam = []

    for seasonType in [2,3]:
        espn_api_url = f"https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/{teamCode}/schedule?season={year}&seasontype={seasonType}"
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


        # Week numbers mapped to their respective rounds for the playoffs
        playoffKeys = {1: "Wild Card Round", 2: "Divisional Round", 3: "Conference Championships", 5: "Super Bowl"}


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
                if seasonType == 3:
                    # if it's the playoffs, retrieve the appropriate round given the week
                    weekNum = playoffKeys.get(int(weekInText), f"Week {weekInText}")


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

                if status == "Final":
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
                    #print(start_time_detail)
                    if start_time_detail[2] == "TBD":
                        start_time = "TBD"
                    else:
                        start_time = start_time_detail[4] + " " + start_time_detail[5] + " " + start_time_detail[6]


                # Add this matchup to the matchups this week list
                matchup_data = {'Date': fullDate, 'WeekNum': weekNum, 'Status': status, 'AwayTeam': awayTeam, 
                                'AwayTeamRecord': awayTeamRecord, 'HomeTeam': homeTeam, 'HomeTeamRecord': homeTeamRecord, 
                                'Venue': fullVenue, 'Broadcast': broadcast, 'SeasonType': seasonType, 'WeekId': weekInText, 'GameId': gameId,
                                'AwayTeamScore': awayTeamScore, 'HomeTeamScore': homeTeamScore, 'Overtime': overtime, 'StartTime': start_time} 
                allMatchupsThisTeam.append(matchup_data)
            

    # Return each matchup from this week to the schedule CSV file
    write_schedule_csv(allMatchupsThisTeam)





    
if __name__ == "__main__":

    # Test examples extracting the schedule (for seasonType: 1=preseason, 2=regular season, 3=playoffs) but idc about preseason
    # e.g. 
    #   get_schedule_data(2025, 1, 2) for Week 1 of 2025, 
    #   get_schedule_data(2024, 15, 2) for Week 15 of 2024, 
    #   get_schedule_data(2024, 5, 3) for Super Bowl of 2024-25 (Eagles 40, Chiefs 22)

    get_schedule_data_by_team(year=2024, teamCode=2)