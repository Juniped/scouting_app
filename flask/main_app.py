from __future__ import print_function

from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
from flask_cors import CORS
from credentials import client_id, client_secret
import requests
import json
import mlr_math
import auth
app = Flask(__name__)
CORS(app)

# Google API Shit
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
prospect_spreadsheet_id = "1v_5ky7VlQALcHoAxkqQfoK9cnSroUlnc_Fsu609Iu1k"
prospect_range_name = "Pitcher Data!A:J"


@app.route('/')
def index():
    return "INDEX"

# @app.route('/search/player/<player>', methods=['GET'])
def player_search(player):
    search_url = "https://redditball.duckblade.com/api/v1/players/search"
    params = {"query": player}
    r = requests.get(search_url, params=params)
    json_results = r.json()
    return json_results
    # return render_template('player_table.html', player=player, search_results=json_results)

@app.route('/info', methods=['GET'])
def pull_data():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server()
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('sheets', 'v4', credentials=creds)

    print("Getting Data")
    # Call the Sheets API
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=prospect_spreadsheet_id, range=prospect_range_name).execute()
    values = result.get('values', [])

    response = []

    if not values:
        print('No data found.')
    else:
        for row in values:
            if len(row) > 0:
                try:
                    response.append(
                        {
                            'player_name':row[0],
                            'inning': row[2],
                            'outs': row[3],
                            'pitch':row[4],
                            'result':row[5],
                            'swing': row[6],
                            'difference':row[7]
                        }
                    )
                except:
                    continue
    return jsonify(response)

@app.route('/info/matrix/<player>', methods=['GET'])
def get_matrix(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    url = f"https://redditball.duckblade.com/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(mlr_math.build_matrix(pitch_json))

@app.route('/info/l6/<player>', methods=['GET'])
def get_6(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    url = f"https://redditball.duckblade.com/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(mlr_math.get_last_6_pitches(pitch_json))

@app.route('/info/raw/<player>', methods=['GET'])
def get_raw(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    url = f"https://redditball.duckblade.com/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(pitch_json)

@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        print(request.get_json())
        username = request.get_json().get('username')
        password = request.get_json().get('password')

        return  {'correct':auth.check_user(username, password)}
#     else:
#         return False
if __name__ == "__main__":
    app.run(ssl_context='adhoc')