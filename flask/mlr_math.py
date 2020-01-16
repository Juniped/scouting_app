import copy

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

def change_matrix(pitch_list):
    pitch_dicts = []
    for pitch in pitch_list:
        pitch_dicts.append({
            'pitch':pitch['pitch'],
            'swing':pitch['swing'],
            'diff':pitch['diff'],
            'result':pitch['result'],
            "game":pitch['game'],
            'change':0,
        })
    for x in range(0, len(pitch_dicts)-1 ):
        if pitch_dicts[x]['game']['id'] != pitch_dicts[x + 1]['game']['id']:
            continue
        if "Auto" in pitch_dicts[x+1]['result'] or "Auto" in pitch_dicts[x]['result']:
            pitch_dicts[x]['change'] = "-"
        else:
            try:
                pitch_dicts[x]['change'] = abs(pitch_dicts[x+1]['pitch'] - pitch_dicts[x]['pitch'])
            except:
                pitch_dicts[x]['change'] = "ER"

        try:
            if pitch_dicts[x]['change'] != "-" and pitch_dicts[x]['change'] != "ER":
                if abs(pitch_dicts[x]['change']) > 500:
                    pitch_dicts[x]['change'] = 1000 - abs(pitch_dicts[x]['change'])
        except IndexError:
            print("BURP")
    ranges = [(1,100),(101,200),(201,300),(301,400),(401,500)]
    
    result_dict = {"HR":0,"3B":0,"2B":0,"1B":0,"BB":0,"FO":0,"K":0,"PO":0,"RGO":0,"LGO":0,"total":0,}
    range_dict = {
        "0":{**{"range":"1-100"}, **result_dict.copy()},
        "1":{**{"range":"101-200"}, **result_dict.copy()},
        "2":{**{"range":"201-300"}, **result_dict.copy()},
        "3":{**{"range":"301-400"}, **result_dict.copy()},
        "4":{**{"range":"401-500"}, **result_dict.copy()},
    }
    for x in range(0,len(pitch_dicts)-1):
        pitch_set = pitch_dicts[x]
        change = pitch_dicts[x]['change']
        if change != "-" and change != "ER":
            pitch_result = pitch_set['result']
            if "Steal" in pitch_result or "CS" in pitch_result or "IBB" in pitch_result or "Auto" in pitch_result:
                continue
            elif "HRD HR" in pitch_result:
                continue
            elif "Bunt DP" in pitch_result:
                pitch_result = "RGO"
            try:
                change = int(change)
                for x in range(0,len(ranges)):
                    if change >= ranges[x][0] and change <= ranges[x][1]:
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
    pitches = pitch_list[-10:]  # Actually Getting last 10 because why not
    l6 = []
    index = 10
    for pitch in pitches:
        l6.append({
            'pitch':pitch['pitch'],
            'swing':pitch['swing'],
            'diff':pitch['diff'],
            'result':pitch['result'],
            'change':0,
            'index': index
        })
        index -= 1
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

def get_last_x_pitches(pitch_list, num):
    negative_num = -1 * num
    pitches = pitch_list[negative_num:]
    last = []
    index = num
    for pitch in pitches:
        last.append({
            'pitch':pitch['pitch'],
            'swing':pitch['swing'],
            'diff':pitch['diff'],
            'result':pitch['result'],
            'change':0,
            'index': index
        })
        index -= 1
    for x in range(0, len(last)-1 ):
        if "Auto" in last[x+1]['result']:
            try:
                last[x]['change'] = last[x+2]['pitch'] - last[x]['pitch']
            except IndexError:
                last[x]['change']= "-"
            except:
                continue
        elif "Auto" in last[x]['result']:
            last[x]['change'] = "-"
        else:
            try:
                last[x]['change'] = last[x+1]['pitch'] - last[x]['pitch']
            except:
                last[x]['change'] = "ER"
        try:
            if last[x]['change'] != "-" and last[x]['change'] != "ER":
                if abs(last[x]['change']) > 500:
                    last[x]['change'] = 1000 - abs(last[x]['change'])
        except IndexError:
            print("BURP")
        # except TypeError as :
            # last[x]['change']
    return last

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
        "7":{"range":"701-800","count":0,"range_min":701,"range_max":800},
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

def last_10_first_pitches(pitch_list):
    first_inning_pitches = []
    inning = ""
    game_id = ""
    for pitch in pitch_list:
        if pitch['game']['id'] != game_id:
            first_inning_pitches.append(pitch)
            game_id = pitch['game']['id']
        elif pitch['beforeState']['inning'] != inning:
            first_inning_pitches.append(pitch)
            inning = pitch['afterState']['inning']
    return first_inning_pitches[-10:]

def get_jumps(pitch_list):
    range_dict = {
        "0":{"range":"1-100","count":0,"range_min":1,"range_max":100},
        "1":{"range":"101-200","count":0,"range_min":101,"range_max":200},
        "2":{"range":"201-300","count":0,"range_min":201,"range_max":300},
        "3":{"range":"301-400","count":0,"range_min":301,"range_max":400},
        "4":{"range":"401-500","count":0,"range_min":401,"range_max":500},
    }
    for i in range(0,len(pitch_list) - 1):
        current_pitch = pitch_list[i]
        next_pitch = pitch_list[i+1]
        val = current_pitch['pitch']
        next_val = next_pitch['pitch']
        
        if "Auto" not in current_pitch['result'] and "Auto" not in next_pitch['result']:
            if val is None or next_val is None:
                continue
            jump = abs(int(next_val) - int(val))
            if jump > 500:
                jump = 1000 - jump
            for r in range_dict.values():
                if jump >= r['range_min'] and jump <= r['range_max']:
                    r['count'] += 1
    ret_list = []
    for key, value in range_dict.items():
        ret_list.append(value)
    return ret_list

def get_counts(pitch_list):
    pitches = {}
    for pitch in pitch_list:
        pitch_num = pitch['pitch']
        if pitch_num is None:
            continue
        if pitch_num not in pitches.keys():
            pitches[pitch_num] = 1
        else:
            pitches[pitch_num] += 1
    pitch_ret_list = []
    for pitch, count in pitches.items():
        pitch_ret_list.append({'pitch':pitch,'count':count})
    return pitch_ret_list

def current_game_stats(pitch_list):
    return_data = {}
    x = -1
    try:
        while True:
            if pitch_list[x]['game']['homeTeam']['milr'] == False:
                most_recent_pitch = pitch_list[x]
                current_game = most_recent_pitch['game']['id']
                break
    except:
        return {
            'avg_jump': "N/A",
            'changeMatrix': change_matrix(current_game_pitches),
            'matrix': build_matrix(current_game_pitches)
        }
    current_game_pitches = []
    # total_diff = 0
    pitch_count = 0
    x = 1
    for pitch in pitch_list:
        if pitch['game']['id'] == current_game:
            pitch['num'] = x
            x += 1
            current_game_pitches.append(pitch)
    return_data['pitches'] = current_game_pitches
    x = 0
    pitch_count = 0
    total_jumps = 0
    for pitch in current_game_pitches:
        pitch_val = pitch['pitch']
        try:
            next_pitch = current_game_pitches[x + 1]['pitch']
            jump = abs(pitch_val - next_pitch)
        except:
            break
        pitch_count += 1
        if jump > 500:
            jump = 1000 - jump
        total_jumps += jump
    if(pitch_count) == 0:
        pitch_count = 1
    try:
        avg_jump = total_jumps / pitch_count
    except:
        avg_jump = total_jumps
    return_data['avg_jump'] = avg_jump
    return_data['changeMatrix'] = change_matrix(current_game_pitches),
    return_data['matrix'] = build_matrix(current_game_pitches)
    return return_data


def double_down_analysis(pitch_list):
    dd = []
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
    results = {
        'total': pitch_dict.copy(),
        'count':pitch_dict.copy(),
        'math':pitch_dict.copy()
    }
    for pitch in pitch_list[1:]:
        # Get the Pitch dictionaries
        x = pitch_list.index(pitch)
        if x + 1 > len(pitch_list) - 1:
            break
        prev_pitch = pitch_list[x - 1]
        next_pitch = pitch_list[x + 1]
        # Get the values
        pitch_val = pitch['pitch']
        prev_val = prev_pitch['pitch']
        # Get the results
        pitch_result = pitch['result']
        if pitch_result in pitch_dict.keys():
            results['total'][pitch_result] += 1
            results['total']['total'] += 1
        prev_result = prev_pitch['result']
        try:
            if abs(prev_val - pitch_val) < 50 and pitch['game']['id'] == prev_pitch['game']['id']:
                dd_item = {
                    "pitch_1": prev_val,
                    "result_1": prev_result,
                    "pitch_2":pitch_val,
                    "result_2": pitch_result
                }
                dd.append(dd_item)
        except:
            pass
        # if abs(next_val - pitch_val) < 50 and pitch['game']['id'] == next_pitch['game']['id']:
        #     dd_item = {
        #         "pitch_1": pitch_val,
        #         "result_1": pitch_result,
        #         "pitch_2":next_val,
        #         "result_2": next_result
        #     }
        #     dd.append(dd_item)
    # Analysis Time

    for double_down in dd:
        if double_down['result_1'] in pitch_dict.keys():
            results['count'][double_down['result_1']] += 1
            results['count']['total'] += 1
    for key in pitch_dict.keys():
        total = results['total'][key]
        count = results['count'][key]
        try:
            math = "{:.2%}".format(float((count / total)))
        except:
            math = "0"
        results['math'][key] = math
    results['total']['_3B'] = results['total']['3B']
    results['total']['_2B'] = results['total']['2B']
    results['total']['_1B'] = results['total']['1B']
    results['count']['_3B'] = results['count']['3B']
    results['count']['_2B'] = results['count']['2B']
    results['count']['_1B'] = results['count']['1B']
    results['math']['_3B'] = results['math']['3B']
    results['math']['_2B'] = results['math']['2B']
    results['math']['_1B'] = results['math']['1B']
    return (dd, results)

def following_pitch(pitch_list):
    pitch_dict = [
        {"range":"1-100","count":0,"range_min":1,"range_max":100},
        {"range":"1-100","count":0,"range_min":101,"range_max":200},
        {"range":"1-100","count":0,"range_min":201,"range_max":300},
        {"range":"1-100","count":0,"range_min":301,"range_max":400},
        {"range":"1-100","count":0,"range_min":401,"range_max":500},
        {"range":"1-100","count":0,"range_min":501,"range_max":600},
        {"range":"1-100","count":0,"range_min":601,"range_max":700},
        {"range":"1-100","count":0,"range_min":701,"range_max":800},
        {"range":"1-100","count":0,"range_min":801,"range_max":900},
        {"range":"1-100","count":0,"range_min":901,"range_max":1000},
    ]
    range_list = [
        {"range":"1-100","range_min":1,"range_max":100, "following":copy.deepcopy(pitch_dict)},
        {"range":"101-200","range_min":101,"range_max":200, "following":copy.deepcopy(pitch_dict)},
        {"range":"201-300","range_min":201,"range_max":300, "following":copy.deepcopy(pitch_dict)},
        {"range":"301-400","range_min":301,"range_max":400, "following":copy.deepcopy(pitch_dict)},
        {"range":"401-500","range_min":401,"range_max":500, "following":copy.deepcopy(pitch_dict)},
        {"range":"501-600","range_min":501,"range_max":600, "following":copy.deepcopy(pitch_dict)},
        {"range":"601-700","range_min":601,"range_max":700, "following":copy.deepcopy(pitch_dict)},
        {"range":"701-800","range_min":701,"range_max":800, "following":copy.deepcopy(pitch_dict)},
        {"range":"801-900","range_min":801,"range_max":900, "following":copy.deepcopy(pitch_dict)},
        {"range":"901-1000","range_min":901,"range_max":1001,  "following":copy.deepcopy(pitch_dict)},
    ]
    for x in range(0, len(pitch_list) -1):
        try:
            pitch = int(pitch_list[x]['pitch'])
            next_val = int(pitch_list[x + 1]['pitch'])
        except:
            continue
        if pitch_list[x]['game']['id'] != pitch_list[x + 1]['game']['id']:
            continue
        for values in range_list:
            if (next_val >= values['range_min']) and (next_val <= values['range_max']):
                flist = values['following']
                for fvalue in flist:
                    if( pitch >= fvalue['range_min']) and (pitch <= fvalue['range_max']):
                        fvalue['count'] += 1

    return range_list

