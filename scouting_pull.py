import requests
import json

player_id = "478"
url = f"https://redditball.duckblade.com/api/v1/players/{player_id}/plays/pitching"

r = requests.get(url)

response_json = r.json()
import csv
with open("scouting_pull.csv", "w") as csv_file:
    for pitch in response_json:
        runners_on_base = 0
        if pitch['beforeState']['firstOccupied']:
            runners_on_base += 1
        if pitch['beforeState']['secondOccupied']:
            runners_on_base += 1
        if pitch['beforeState']['thirdOccupied']:
            runners_on_base += 1
        csv_file.write(
            f"{pitch['pitcher']['name']},"
            f","
            f"{pitch['beforeState']['inning']},"
            f"{pitch['beforeState']['outs']},"
            f"{pitch['pitch']},"
            f"{pitch['result']},"
            f"{pitch['swing']},"
            f"{pitch['diff']},"
            f"{runners_on_base},"
            f",\n"
        )