
import yaml
#Super Super SUUUPER basic authorization.
def check_user(username, password):
    with open("passfile.yaml","r") as file:
        data= yaml.load(file, Loader=yaml.FullLoader)
    users = data['users']
    correct_password = users.get(username.lower(), None)
    if correct_password:
        if password == correct_password:
            if username.lower() == "wbc":
                return "wbclogin"
            else:
                return "oslogin"
    return False    