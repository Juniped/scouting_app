''' This file is used to create users in the databse, to create, populate the users dict with users where

key == username
value == password

and run the script

'''
from models import get_session, User
users = {
}

with get_session() as session:
    for key,value in users.items():
        new_user = User(username=key)
        new_user.set_password(value)
        session.add(new_user)
        print(f"User: {new_user.username} Created")
