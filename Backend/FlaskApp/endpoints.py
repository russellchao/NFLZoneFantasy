from flask import Flask
from flask_cors import CORS
from ScheduleData.GetScheduleData import get_schedule_data
from ScheduleData.UpdateScheduleDB import update_schedule_database


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/scheduleData/<year>")
def update_schedule(year):
    # Retrieves all preseason, regular season, and playoff matches of the given year 

    try:
        get_schedule_data(year)
        update_schedule_database()
        return "Success updating schedule data"
    
    except Exception as e:
        print(f"Failure, {e}")
        return "Failure updating schedule data"

    
if __name__ == "__main__":
    app.run()
    