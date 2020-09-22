from __future__ import print_function
from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
from flask_cors import CORS
import requests
import json
import mlr_math
import auth
import statistics
from advanced import predictions
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
    search_url = "https://redditball.com/api/v1/players/search"
    params = {"query": player}
    r = requests.get(search_url, params=params)
    json_results = r.json()
    return json_results
    # return render_template('player_table.html', player=player, search_results=json_results)

@app.route("/login", methods=['POST','GET'])
def login():
    if request.method == 'POST':
        username = request.get_json().get('username')
        password = request.get_json().get('password')
        return  {'correct':auth.login(username, password)}
    else:
        return {'correct':False}

@app.route("/verify_login",methods=["POST"])
def verify():
    if request.method == 'POST':
        username = request.get_json().get('username')
        password = request.get_json().get('password')
        return  {'correct':auth.check_session(username, password)}
    else:
        return {'correct':False}

@app.route("/get/team/name/<name>",methods=['GET'])
def get_teams(name): 
    # Because we define our own names we should only be getting one back per attempt
    params = {"query": name}
    url = "https://redditball.com/api/v1/teams/search"
    r = requests.get(url, params=params)
    return jsonify(r.json())

@app.route("/get/wbc/team/name/<name>",methods=['GET'])
def get_wbc_teams(name): 
    # Because we define our own names we should only be getting one back per attempt
    params = {"query": name}
    url = "https://wbc.duckblade.com/api/v1/teams/search"
    r = requests.get(url, params=params)
    return jsonify(r.json())

@app.route("/get/batters/team/<team_id>", methods=['GET'])
def get_batters_via_team_id(team_id):
    url =  f'https://redditball.com/api/v1/players/byTeam/{ team_id }'
    r = requests.get(url)
    batters = []
    for player in r.json():
        # if player['positionPrimary'] != "P":
        batters.append(player)
    sorted_batters = sorted(batters, key=lambda k: k['name']) 
    return jsonify(sorted_batters)

@app.route("/get/pitchers/team/<team_id>", methods=['GET'])
def get_pitchers_via_team_id(team_id):
    url =  f"https://redditball.com/api/v1/players/byTeam/{team_id}"
    r = requests.get(url)
    pitchers = []
    for player in r.json():
        pitchers.append(player)
    sorted_pitchers = sorted(pitchers, key=lambda k: k['name']) 
    return jsonify(sorted_pitchers)

@app.route("/info/batter/<id>")
def get_batter_info(id):
    url = f"https://redditball.com/api/v1/players/{id}/plays/batting"
    r = requests.get(url)
    try:
        data = { "data": [ d for d in r.json() if d['game']['homeTeam']['milr'] == False], "fav":0}
    except:
        
         data = {"data":[ d for d in r.json() ], "fav":0}
    swings = []
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
    url = f"https://redditball.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    try:
        data = { "data": [ d for d in r.json() if d['game']['homeTeam']['milr'] == False], "fav":0}
        data['milrData'] = [d for d in r.json() if d['game']['homeTeam']['milr'] == True]    
    except KeyError:
        data = {"data":[ d for d in r.json() ], "fav":0}
        data['milrData'] = []
    fcb_data = check_fcb_data(data['data'][0]['pitcher']['name'])
    combined_data = fcb_data + data['data']
    data['data'] = combined_data
    analyze_data(data)
    predictions.scouting_analysis(data)
    return jsonify(data)

@app.route("/info/pitcher/milr/<id>")
def get_milr_pitcher_info(id):
    url = f"https://milr.redditball.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    # print(r.json()[0]['game'])
    # data = { "data": [ d for d in r.json() if d['game']['homeTeam']['milr'] == True], "fav":0}
    data = {"data":[ d for d in r.json() ], "fav":0}
    # data['milrData'] = [d for d in r.json() if d['game']['homeTeam']['milr'] == True]    
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
    # Get last 10 starts:
    data['last_first'] = mlr_math.last_10_first_pitches(data['data'])
    # Get Jumps
    data['jumps'] = mlr_math.get_jumps(data['data'])
    data['change_matrix'] = mlr_math.change_matrix(data['data'])
    print(data)
    return jsonify(data)

@app.route("/info/pitcher/counts/<id>")
def get_pitcher_counts(id):
    url = f"https://redditball.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    data = { "data": r.json()}
    # Get Counts
    pre_sorted_counts = mlr_math.get_counts(data['data'])
    data['counts']  = sorted(pre_sorted_counts, key=lambda i: (i['pitch']))
    return jsonify(data)

## ==================== WBC INFO==========================
@app.route("/info/wbc/pitcher/counts/<id>")
def get_wbc_pitcher_counts(id):
    url = f"https://wbc.duckblade.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    data = { "data": r.json()}
    # Get Counts
    pre_sorted_counts = mlr_math.get_counts(data['data'])
    data['counts']  = sorted(pre_sorted_counts, key=lambda i: (i['pitch']))
    return jsonify(data)

@app.route("/get/wbc/pitchers/team/<team_id>", methods=['GET'])
def get_wbc_pitchers_via_team_id(team_id):
    url =  f"https://wbc.duckblade.com/api/v1/players/byTeam/{team_id}"
    r = requests.get(url)
    pitchers = []
    for player in r.json():
        # if player['positionPrimary'] == "P":
        pitchers.append(player)
    sorted_pitchers = sorted(pitchers, key=lambda k: k['name']) 
    return jsonify(sorted_pitchers)

@app.route("/info/wbc/pitcher/<id>")
def get_wbc_pitcher_info(id):
    url = f"https://wbc.duckblade.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    # print(r.json()[0]['game'])
    data = { "data": r.json(), "fav":0}
    # data['milrData'] = [d for d in r.json() if d['game']['homeTeam']['milr'] == True]    
    analyze_data(data)
    return jsonify(data)
## ================= FCB INFO =========

@app.route("/info/fcb/pitcher/counts/<id>")
def get_fcb_pitcher_counts(id):
    url = f"https://fcb.redditball.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    data = { "data": r.json()}
    # Get Counts
    pre_sorted_counts = mlr_math.get_counts(data['data'])
    data['counts']  = sorted(pre_sorted_counts, key=lambda i: (i['pitch']))
    return jsonify(data)

@app.route("/info/fcb/pitcher/<id>")
def get_fcb_pitcher_info(id):
    url = f"https://fcb.redditball.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    print(r.json()[0]['game'])
    data = { "data": r.json(), "fav":0}
    analyze_data(data)
    return jsonify(data)

@app.route("/get/fcb/team/name/<name>",methods=['GET'])
def get_fcb_teams(name): 
    # Because we define our own names we should only be getting one back per attempt
    params = {"query": name}
    url = "https://fcb.redditball.com/api/v1/teams/search"
    r = requests.get(url, params=params)
    return jsonify(r.json())

@app.route("/get/fcb/pitchers/team/<team_id>", methods=['GET'])
def get_fcb_pitchers_via_team_id(team_id):
    url =  f"https://fcb.redditball.com/api/v1/players/byTeam/{team_id}"
    r = requests.get(url)
    pitchers = []
    for player in r.json():
        pitchers.append(player)
    sorted_pitchers = sorted(pitchers, key=lambda k: k['name']) 
    return jsonify(sorted_pitchers)

def check_fcb_data(name):
    url = f"https://fcb.redditball.com/api/v1/players/search?query={name}"
    r = requests.get(url)
    print(r.json())
    if len(r.json()) == 0:
        return []
    id = r.json()[0]['id']
    url = f"https://fcb.redditball.com/api/v1/players/{id}/plays/pitching"
    r = requests.get(url)
    fcb_data = r.json()
    return fcb_data


##===== Generic Utilities =========================
def analyze_data(data):
    pitches = []
    edge_num = 0
    middle_num = 0
    for pitch in data['data']:
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
    # Get last 10 starts:
    data['last_first'] = mlr_math.last_10_first_pitches(data['data'])
    # Get Jumps
    data['jumps'] = mlr_math.get_jumps(data['data'])
    data['change_matrix'] = mlr_math.change_matrix(data['data'])
    double_down_data = mlr_math.double_down_analysis(data['data'])
    data['double_down'] = double_down_data[0]
    data['double_down_results'] = double_down_data[1]
    data['current_game'] = mlr_math.current_game_stats(data['data'])
    data['last20'] = mlr_math.get_last_x_pitches(data['data'], 20)
    data['following'] = mlr_math.following_pitch(data['data'])
    data['bounceback'] = mlr_math.get_bounceback(data['data'])


if __name__ == "__main__":
    app.run(ssl_context='adhoc')