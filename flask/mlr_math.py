

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
            'change':0,
        })
    for x in range(0, len(pitch_dicts)-1 ):
        if "Auto" in pitch_dicts[x+1]['result']:
            try:
                pitch_dicts[x]['change'] = pitch_dicts[x+2]['pitch'] - pitch_dicts[x]['pitch']
            except IndexError:
                pitch_dicts[x]['change']= "-"
        elif "Auto" in pitch_dicts[x]['result']:
            pitch_dicts[x]['change'] = "-"
        else:
            try:
                pitch_dicts[x]['change'] = pitch_dicts[x+1]['pitch'] - pitch_dicts[x]['pitch']
            except:
                pitch_dicts[x]['change'] = "ER"
        try:
            if pitch_dicts[x]['change'] != "-" and pitch_dicts[x]['change'] != "ER":
                if abs(pitch_dicts[x]['change']) > 500:
                    pitch_dicts[x]['change'] = 1000 - abs(pitch_dicts[x]['change'])
        except IndexError:
            print("BURP")
    ranges = [(1,100),(101,200),(201,300),(301,400),(401,500),(501,600),(601,700),(701,800),(801,900),(901,1000),]
    
    result_dict = {"HR":0,"3B":0,"2B":0,"1B":0,"BB":0,"FO":0,"K":0,"PO":0,"RGO":0,"LGO":0,"total":0,}
    range_dict = {
        "0":{**{"range":"1-100"}, **result_dict.copy()},
        "1":{**{"range":"101-200"}, **result_dict.copy()},
        "2":{**{"range":"201-300"}, **result_dict.copy()},
        "3":{**{"range":"301-400"}, **result_dict.copy()},
        "4":{**{"range":"401-500"}, **result_dict.copy()},
        # "5":{**{"range":"501-600"}, **result_dict.copy()},
        # "6":{**{"range":"601-700"}, **result_dict.copy()},
        # "7":{**{"range":"701-900"}, **result_dict.copy()},
        # "8":{**{"range":"801-900"}, **result_dict.copy()},
        # "9":{**{"range":"901-1000"}, **result_dict.copy()},
    }
    for x in range(0,len(pitch_dicts)-1):
        pitch_set = pitch_dicts[x]
        # next_val = pitch_dicts[x + 1]['pitch']
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
            inning = pitch['beforeState']['inning']
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
            jump = int(val) - int(next_val)
            if jump > 1000:
                jump = 1000 - jump
            for r in range_dict.values():
                if jump > r['range_min'] and jump <= r['range_max']:
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

def random_stats(pitch_list):
    return "yadayadayadayadayadayadayadayadayadaydaydaydaydaydayda"

    