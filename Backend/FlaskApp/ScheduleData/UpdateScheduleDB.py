import os
import csv
from supabase import create_client, Client
from dotenv import load_dotenv

def update_schedule_database():
    # Connect to the NFL Zone Supabase Project
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)

    # Update the Database with the Schedule Data CSV Filef"ScheduleData/schedule_data.csv"
    csvFilename = f"ScheduleData/schedule_data.csv"
    try:
        # Clear existing data - delete all records in the schedule table
        supabase.table('schedule').delete().gte('game_id', 0).execute()
        
        # Read and process the CSV file
        with open(csvFilename, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            # Process records in batches for better performance
            batch_size = 100
            batch = []
            
            for row in reader:
                # Prepare the data for insertion
                schedule_data = {
                    'date': row['Date'],
                    'week_num': row['WeekNum'],
                    'status': row['Status'],
                    'away_team': row['AwayTeam'],
                    'away_team_record': row['AwayTeamRecord'],
                    'home_team': row['HomeTeam'],
                    'home_team_record': row['HomeTeamRecord'],
                    'venue': row['Venue'],
                    'broadcast': row['Broadcast'],
                    'season_type': int(row['SeasonType']),
                    'week_id': int(row['WeekId']),
                    'game_id': int(row['GameId']),
                    'away_team_score': int(row['AwayTeamScore']),
                    'home_team_score': int(row['HomeTeamScore']),
                    'overtime': row['Overtime'].lower() == 'true' if row['Overtime'] else False,
                    'start_time': row['StartTime']
                }
                
                batch.append(schedule_data)
                
                # Insert batch when it reaches the batch size
                if len(batch) >= batch_size:
                    result = supabase.table('schedule').insert(batch).execute()
                    batch = []
            
            # Insert any remaining records
            if batch:
                supabase.table('schedule').insert(batch).execute()
        
        print("Successfully updated schedule database")
        return "Success"
        
    except FileNotFoundError:
        print(f"Error: CSV file {csvFilename} not found")
        return "Error: CSV file not found"
    except Exception as e:
        print(f"Error updating schedule database: {str(e)}")
        return f"Error: {str(e)}"
    