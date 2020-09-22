
import yaml
from models import *
#Super Super SUUUPER basic authorization.
def login(username, password):
    # with open("passfile.yaml","r") as file:
    #     data= yaml.load(file, Loader=yaml.FullLoader)
    # users = data['users']
    with get_session() as session:
        query = session.query(User).filter(User.username == username.lower()).all()
        for result in query:
            if password_check = result.check_password(password):
                new_session = ActiveSessions(user_id=result.id)
                return result.get_hash()
        return False  