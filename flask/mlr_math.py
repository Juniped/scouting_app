

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
    range_dict = {
        "0":0,
        "1":0,
        "2":0,
        "3":0,
        "4":0,
        "5":0,
        "6":0,
        "7":0,
        "8":0,
        "9":0,

    }
    pitch_dict = {
        "HR":range_dict.copy(),
        "3B":range_dict.copy(),
        "2B":range_dict.copy(),
        "1B":range_dict.copy(),
        "BB":range_dict.copy(),
        "FO":range_dict.copy(),
        "K":range_dict.copy(),
        "PO":range_dict.copy(),
        "RGO":range_dict.copy(),
        "LGO":range_dict.copy(), 
    }
    for pitch_set in pitch_list:
        pitch_val = pitch_set['pitch']
        pitch_result = pitch_set['result']
        for x in range(0,len(ranges)):
            if pitch_val >= ranges[x][0] and pitch_val <= ranges[x][1]:

                pitch_dict[pitch_result][str(x)] += 1
                break
    return pitch_dict