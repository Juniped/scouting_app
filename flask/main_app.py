from __future__ import print_function

from flask import Flask
from flask import render_template
from flask import jsonify
from flask_cors import CORS
from credentials import client_id, client_secret
import requests
import json

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

@app.route('/search/player/<player>', methods=['GET'])
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
                # is_first = False
                # if row[8] != "":
                #     is_first = True
                # Name	Session	Innings	Outs	Pitch	Result	Swing	Diff	OBC	First Pitch
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
                            # 'is_first': is_first,
                        }
                    )
                except:
                    continue
    return jsonify(response)
