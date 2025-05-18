import psycopg2
import pandas as pd
from db_info import hostname, database, username, pwd, port_id
 
def update_player_stats_database(data_type):
    """
    Load a CSV file and update the corresponding PostgreSQL table.
    `data_type` is one of: passing, rushing, receiving, defense, kicking
    `db_config` is a dict with keys: dbname, user, password, host, port
    """
    csv_file = f"{data_type}_stats.csv"
    table_name = f"{data_type}_stats"

    try:
        df = pd.read_csv(csv_file)
        print(f"Successfully read {csv_file}")
    except Exception as e:
        print(f"Failed to read {csv_file}: {e}")
        return
    
    
    try:
        conn = psycopg2.connect(
            host = hostname,
            dbname = database,
            user = username,
            password = pwd,
            port = port_id
        )
        cur = conn.cursor()

        # Truncate table before inserting new data
        cur.execute(f"TRUNCATE TABLE {table_name}")

        # Prepare insert
        columns = ','.join(df.columns)
        values_template = ','.join(['%s'] * len(df.columns))

        for row in df.itertuples(index=False, name=None):
            cur.execute(
                f"INSERT INTO {table_name} ({columns}) VALUES ({values_template})",
                row
            )

        conn.commit()
        cur.close()
        conn.close()
        print(f"Updated {table_name} from {csv_file}")


    except Exception as e:
        print(f"Failed to update PostgreSQL table {table_name}: {e}")








