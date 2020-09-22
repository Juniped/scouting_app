from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from config import username, password, host, database
from werkzeug.security import generate_password_hash, check_password_hash
from contextlib import contextmanager

# Create Base Needed Objects
engine = create_engine(f"mysql://{username}:{password}@{host}/{database}")
Session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()


## Debug Mode Flag
debug = False

def test_connection():
    print(engine)

def create_tables():
    print("Creating Tables")
    Base.metadata.create_all(engine)
    print("Done")

@contextmanager
def get_session():
    print(f"Debug Mode: {debug}")
    session = Session()
    try:
        yield session
        if debug:
            session.rollback()
        else:
            session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
    
class User(Base):
    __tablename__ = "users"
    
    id = Column('id', Integer, primary_key=True, nullable=False)
    username = Column('username', String(100), nullable=False)
    password_hash = Column('pass_hash', String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class ActiveSessions(Base):
    __tablename__ = "active_sessions"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column('user_id', ForeignKey('users.id',ondelete='CASCADE', onupdate='CASCADE'))
    session_key = Column('session_key',String(128), nullable=False)

    def set_key(self, key):
        self.session_key = generate_password_hash(key)

    def check_key(self,key):
        return check_password_hash(self.session_key, key)

if __name__ == "__main__":
    create_tables()