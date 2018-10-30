from app import db
from app.models.base import Base


class Label(Base):
    __tablename__ = "labels"
    tweet_id = db.Column('tweet_id', db.Integer, db.ForeignKey('tweets.id'))
    label = db.Column('label', db.Integer, nullable=False)

    labeled_by = db.Column('labeled_by', db.Integer, db.ForeignKey('users.id'))

    def __init__(self, tweet_id, label, labeled_by):
        self.tweet_id = tweet_id
        self.label = label
        self.labeled_by = labeled_by

    def get_id(self):
        return self.id

    def get_fields(self):
        return '{' + '"tweet_id": "{0}" , "label": "{1}" , "labeled_by": "{2}" '.format(self.tweet_id, self.label,
                                                                               self.labeled_by) + '}'

    def __repr__(self):
        return '<Labeled Tweet %r>' % self.id


