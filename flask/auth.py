users = {
    "juniped":"kg6zth",
    "orioles":"d1ngers",
}

#Super Super SUUUPER basic authorization.
def check_user(username, password):
    correct_password = users.get(username.lower(), None)
    if correct_password:
        if password == correct_password:
            return True
    return False    