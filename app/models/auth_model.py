from datetime import datetime
from app import db
from app.models.base import Base


class User(Base):
    __tablename__ = "users"
    id = db.Column('id', db.Integer, primary_key=True)
    first = db.Column('first', db.String(50), nullable=False)
    last = db.Column('last', db.String(50), nullable=False)
    username = db.Column('username', db.String(50), unique=True, nullable=False)
    email = db.Column('email', db.String(50), unique=True, nullable=False)
    password = db.Column('password', db.String(192), nullable=False)
    # phone = db.Column('phone', db.String(11))
    # first_name = db.Column('first_name', db.String(15))
    # last_name = db.Column('last_name', db.String(15))

    def __init__(self, first, last, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.first = first
        self.last = last
    # self.phone = phone


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

    def get_fields(self):

        return '{' + '"first": "{0}" , "last": "{1}" , "username": "{2}" , "email": "{3}" , "id": "{4}"'.format(self.first, self.last, self.username, self.email, self.id) + '}'

    def __repr__(self):
        return '<User %r>' % self.username


