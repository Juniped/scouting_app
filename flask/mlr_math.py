

def build_matrix(pitch_list):
    ranges = [
        (1,100),
        (101,200),
        (201,300),
        (301,400),
        (401,500),
        (501,600),
        (601,700),
        (701,800),
        (801,900),
        (901,1000),
    ]
    
    pitch_dict = {
        "HR":0,
        "3B":0,
        "2B":0,
        "1B":0,
        "BB":0,
        "FO":0,
        "K":0,
        "PO":0,
        "RGO":0,
        "LGO":0,
        "total":0,
    }
    range_dict = {
        "0":{**{"range":"1-100"}, **pitch_dict.copy()},
        "1":{**{"range":"101-200"}, **pitch_dict.copy()},
        "2":{**{"range":"201-300"}, **pitch_dict.copy()},
        "3":{**{"range":"301-400"}, **pitch_dict.copy()},
        "4":{**{"range":"401-500"}, **pitch_dict.copy()},
        "5":{**{"range":"501-600"}, **pitch_dict.copy()},
        "6":{**{"range":"601-700"}, **pitch_dict.copy()},
        "7":{**{"range":"701-900"}, **pitch_dict.copy()},
        "8":{**{"range":"801-900"}, **pitch_dict.copy()},
        "9":{**{"range":"901-1000"}, **pitch_dict.copy()},
    }

    for x in range(0,len(pitch_list)-1):
        pitch_set = pitch_list[x]
        next_val = pitch_list[x + 1]['pitch']
        if next_val:
            pitch_result = pitch_set['result']
            if "Steal" in pitch_result or "CS" in pitch_result or "IBB" in pitch_result or "Auto" in pitch_result:
                continue
            elif "HRD HR" in pitch_result:
                continue
            elif "Bunt DP" in pitch_result:
                pitch_result = "RGO"
            try:
                for x in range(0,len(ranges)):
                    if next_val >= ranges[x][0] and next_val <= ranges[x][1]:
                        range_dict[str(x)][pitch_result] += 1
                        range_dict[str(x)]['total'] += 1
                        break
            except:
                pass #I don't know this result
    ret_list = []
    for key, value in range_dict.items():

        ret_list.append(value)
    return ret_list

def get_last_6_pitches(pitch_list):
    pitches = pitch_list[-6:]
    l6 = []
    for pitch in pitches:
        l6.append({
            'pitch':pitch['pitch'],
            'swing':pitch['swing'],
            'diff':pitch['diff'],
            'result':pitch['result'],
            'change':0,
        })
    for x in range(0, len(l6)-1 ):
        if "Auto" in l6[x+1]['result']:
            try:
                l6[x]['change'] = l6[x+2]['pitch'] - l6[x]['pitch']
            except IndexError:
                l6[x]['change']= "-"
        elif "Auto" in l6[x]['result']:
            l6[x]['change'] = "-"
        else:
            try:
                l6[x]['change'] = l6[x+1]['pitch'] - l6[x]['pitch']
            except:
                l6[x]['change'] = "ER"
        try:
            if l6[x]['change'] != "-" and l6[x]['change'] != "ER":
                if abs(l6[x]['change']) > 500:
                    l6[x]['change'] = 1000 - abs(l6[x]['change'])
        except IndexError:
            print("BURP")
        # except TypeError as :
            # l6[x]['change']
    return l6

def get_first_inning(pitch_list):
    first_inning_pitches = []
    inning = ""
    game_id = ""
    for pitch in pitch_list:
        if pitch['game']['id'] != game_id:
            first_inning_pitches.append(pitch)
            game_id = pitch['game']['id']
        elif pitch['beforeState']['inning'] != inning:
            first_inning_pitches.append(pitch)
            inning = pitch['beforeState']['inning']
    range_dict = {
        "0":{"range":"1-100","count":0,"range_min":1,"range_max":100},
        "1":{"range":"101-200","count":0,"range_min":101,"range_max":200},
        "2":{"range":"201-300","count":0,"range_min":201,"range_max":300},
        "3":{"range":"301-400","count":0,"range_min":301,"range_max":400},
        "4":{"range":"401-500","count":0,"range_min":401,"range_max":500},
        "5":{"range":"501-600","count":0,"range_min":501,"range_max":600},
        "6":{"range":"601-700","count":0,"range_min":601,"range_max":700},
        "7":{"range":"701-900","count":0,"range_min":701,"range_max":800},
        "8":{"range":"801-900","count":0,"range_min":801,"range_max":900},
        "9":{"range":"901-1000","count":0,"range_min":901,"range_max":1001},
    }
    for pitch in first_inning_pitches:
        value = pitch['pitch']
        if value is not None:
            value = int(value)
            for r in range_dict.values():
                if value >= r['range_min'] and value <= r['range_max']:
                    r['count'] += 1
    ret_list = []
    for key, value in range_dict.items():

        ret_list.append(value)
    return ret_list

# def get_raw_split(pitch_list, pitcher_team):
#     from_behind = []
#     from_ahead = []
#     for pitch in pitch_list:
#         home_score = int(pitch['beforeState']['homeScore'])
#         away_score = int(pitch['beforeState']['awayScore'])
#         if pitcher_team = pitch['game']['homeTeam']['id']:
#             pitcher_score = home_score
#             opposing_score = away_score
#         else:
#             pitcher_score = away_score
#             opposing_score = home_score
#         if pitcher_score > opposing_score:
#             from_ahead.append(pitch)
#         else:
#             from_behind.append(pitch)
#     return {"behind":from_behind, "ahead":from_ahead}

def random_stats(pitch_list):
    return "yadayadayadayadayadayadayadayadayadaydaydaydaydaydayda"

    