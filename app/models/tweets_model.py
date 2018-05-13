from datetime import datetime
from app import db
from json import JSONEncoder


# Define a base model for other database tables to inherit
class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())


class Tweet(Base):
    __tablename__ = "tweets"
    id = db.Column('id', db.Integer, primary_key=True)
    text = db.Column('text', db.String(300), nullable=False)

    def __init__(self, id, text):
        self.id = id
        self.text = text

    def get_id(self):
        return str(self.id)

    def get_fields(self):
        return '{' + '"id": "{0}" , "text": "{1}" '.format(self.id, self.text) + '}'

    def __repr__(self):
        return '<Tweet %r>' % self.id


