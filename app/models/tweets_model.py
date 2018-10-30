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
    text = db.Column('text', db.String(300), nullable=False)
    tweet_id = db.Column('tweet_id', db.String(300), nullable=False)


    def __init__(self, tweet_id, text):
        self.text = text
        self.tweet_id = tweet_id

    def get_id(self):
        return self.id

    def get_fields(self):
        return '{' + '"id": "{0}" , "text": "{1}" , "tweet_id": "{2}" '.format(self.id, self.text, self.tweet_id) + '}'

    def __repr__(self):
        return '<Tweet %r>' % self.id


