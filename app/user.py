from datetime import datetime
import app

db=app.db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column('user_id', db.Integer, primary_key=True)
    email = db.Column('email', db.String(50), unique=True, index=True)
    password = db.Column('password', db.String(15))
    registered_on = db.Column('registered_on', db.DateTime)
    first_name = db.Column('first_name', db.String(15))
    last_name = db.Column('last_name', db.String(15))

    def __init__(self, email, password, first_name, last_name):
        self.email = email
        self.password = password
        self.registered_on = datetime.utcnow()
        self.first_name = first_name
        self.last_name = last_name

    @staticmethod
    def is_authenticated():
        return True

    @staticmethod
    def is_active():
        return True

    @staticmethod
    def is_anonymous():
        return False

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return '<User %r>' % (self.first_name+self.last_name)