

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
        "IBB":0,
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
    # pitches = [(x['pitch'],x['result']) for x in pitch_list]
    # # next_pitch = 0
    # for x in range(0,len(pitches)):
    print(range_dict)

    for x in range(0,len(pitch_list)-1):
        pitch_set = pitch_list[x]
        # print(pitch_set)
        # pitch_val = pitch_set['pitch']
        # if x + 1 != len(pitch_list):
        next_val = pitch_list[x + 1]['pitch']
        if next_val:
            # continue

            pitch_result = pitch_set['result']
            for x in range(0,len(ranges)):
                if next_val >= ranges[x][0] and next_val <= ranges[x][1]:
                    range_dict[str(x)][pitch_result] += 1
                    break
    ret_list = []
    for key, value in range_dict.items():
        ret_list.append(value)
    return ret_list
    