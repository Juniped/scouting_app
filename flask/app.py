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
import statistics
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
    search_url = "https://redditball.xyz/api/v1/players/search"
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
                    response.append( {'player_name':row[0], 'inning': row[2], 'outs': row[3], 'pitch':row[4], 'result':row[5], 'swing': row[6], 'difference':row[7]})
                except:
                    continue
    return jsonify(response)

@app.route('/info/matrix/<player>', methods=['GET'])
def get_matrix(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    url = f"https://redditball.xyz/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(mlr_math.build_matrix(pitch_json))

@app.route('/info/l6/<player>', methods=['GET'])
def get_6(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    url = f"https://redditball.xyz/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(mlr_math.get_last_6_pitches(pitch_json))

@app.route('/info/raw/<player>', methods=['GET'])
def get_raw(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    url = f"https://redditball.xyz/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(pitch_json)

@app.route('/info/raw/split/<player>',methods=['GET'])
def get_raw_split(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    pitcher_team = playuer_data[0]['team']['id']
    url = f"https://redditball.xyz/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(mlr_math.get_split_raw(pitch_json, pitcher_team))

@app.route('/info/first_inning/<player>', methods=['GET'])
def get_first_inning(player):
    player_data = player_search(player)
    player_id = player_data[0]['id']
    url = f"https://redditball.xyz/api/v1/players/{player_id}/plays/pitching"
    r = requests.get(url)
    pitch_json = r.json()
    return jsonify(mlr_math.get_first_inning(pitch_json))


@app.route("/login", methods=['POST','GET'])
def login():
    if request.method == 'POST':
        username = request.get_json().get('username')
        password = request.get_json().get('password')
        return  {'correct':auth.check_user(username, password)}
    else:
        print(request)
        return {'correct':False}

@app.route("/get/team/name/<name>",methods=['GET'])
def get_teams(name):
    # Because we define our own names we should only be getting one back per attempt
    params = {"query": name}
    url = "https://redditball.xyz/api/v1/teams/search"
    r = requests.get(url, params=params)
    return jsonify(r.json())

@app.route("/get/batters/team/<team_id>", methods=['GET'])
def get_batters_via_team_id(team_id):
    url =  f"https://redditball.xyz/api/v1/players/byTeam/{team_id}"
    r = requests.get(url)
    batters = []
    for player in r.json():
        if player['positionPrimary'] != "P":
            batters.append(player)
    sorted_batters = sorted(batters, key=lambda k: k['name']) 
    return jsonify(sorted_batters)

@app.route("/get/pitchers/team/<team_id>", methods=['GET'])
def get_pitchers_via_team_id(team_id):
    url =  f"https://redditball.xyz/api/v1/players/byTeam/{team_id}"
    r = requests.get(url)
    pitchers = []
    for player in r.json():
        if player['positionPrimary'] == "P":
            pitchers.append(player)
    sorted_pitchers = sorted(pitchers, key=lambda k: k['name']) 
    return jsonify(sorted_pitchers)

@app.route("/info/batter/<id>")
def get_batter_info(id):
    url = f"https://redditball.xyz/api/v1/players/{id}/plays/batting"
    r = requests.get(url)
    data = { "data": r.json(), "fav":0}
    pitches = []
    edge_num = 0
    middle_num = 0
    for swing in r.json():
        sw = swing['swing']
        try:
            swint = int(sw)
            if swint > 250 and swint < 750:
                middle_num += 1
            else:
                edge_num += 1
        except:
            pass
        swings.append(sw)
    data['edge_vs_middle'] = [
        {"name": "Edge", "value": edge_num},
        {"name": "Middle", "value": middle_num},
    ]
    try:
        data['fav'] = statistics.mode(swings)
    except:
        data['fav'] = "No Favorite"

    return jsonify(data)

@app.route("/info/pitcher/<id>")
def get_pitcher_info(id):
    url = f"https://redditball.xyz/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    data = { "data": r.json(), "fav":0}
    pitches = []
    edge_num = 0
    middle_num = 0
    for pitch in r.json():
        pi = pitch['pitch']
        try:
            piint = int(pi)
            if piint > 250 and piint < 750:
                middle_num += 1
            else:
                edge_num += 1
        except:
            pass
        pitches.append(pi)
    data['eVm'] = [
        {"name": "Edge", "value": edge_num},
        {"name": "Middle", "value": middle_num},
    ]
    try:
        data['fav'] = statistics.mode(pitches)
    except:
        data['fav'] = "No Favorite"
    # Get Last 6
    data['last_6'] = mlr_math.get_last_6_pitches(data['data'])
    # Get Matrix
    data['matrix'] = mlr_math.build_matrix(data['data'])
    # Get First Inning
    data['first_inning'] = mlr_math.get_first_inning(data['data'])
    return jsonify(data)

if __name__ == "__main__":
    app.run(ssl_context='adhoc')