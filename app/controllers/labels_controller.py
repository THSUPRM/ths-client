from flask import request, Blueprint, Response

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.tweets_model import Tweet
from app.models.labels_model import Label
import json


# Define the blueprint: 'labelss', set its url prefix: app.url/labels
labels_module = Blueprint('labels', __name__, url_prefix='/labels')


@labels_module.route('/get_label/<int:id>', methods=['GET'])
def get_label(id):
    label = Label.query.filter_by(id=id).first()
    if label is None:
        message = 'Tweet does not exist'
        app.logger.error('GET /tweets/get_tweet HTTP/1.1 404 Not Found - ' + message)
        resp = Response(message, status=404, mimetype='application/text')
        return resp
    app.logger.info("Label: " + str(label))
    return Response(label.get_fields(), status=200, mimetype='application/json')


@labels_module.route('/get_labels-tweet/<int:tweet_id>', methods=['GET'])
def get_labels_by_tweet(tweet_id):
    labels = Label.query.filter_by(tweet_id=tweet_id).all()

    if labels is None:
        message = 'Tweet has not been labeled'
        app.logger.error('GET /labels/get_labels-tweet HTTP/1.1 404 Not Found - ' + message)
        resp = Response(message, status=404, mimetype='application/text')
        return resp

    result = '['
    for label in labels:
        result += label.get_fields() + ' , '
    result = result[0:len(result) - 2] + ']'
    app.logger.info("Labels: " + result)

    return Response(result, status=200, mimetype='application/json')


@labels_module.route('/get_labels-user/<int:labeled_by>', methods=['GET'])
def get_labels_by_user(labeled_by):
    labels = Label.query.filter_by(labeled_by=labeled_by).all()
    app.logger.info("Query Labels: " + str(labels))

    if len(labels) == 0:
        message = 'User has not labeled any tweets.'
        app.logger.error('GET /labels/get_labels-tweet HTTP/1.1 404 Not Found - ' + message)
        resp = Response(message, status=404, mimetype='application/text')
        return resp

    result = '['
    for label in labels:
        result += label.get_fields() + ' , '
    result = result[0:len(result) - 2] + ']'
    app.logger.info("Labels: " + result)

    return Response(result, status=200, mimetype='application/json')


#
# @auth_module.route('/logout')
# def logout():
#     logout_user()
#     return Response("Logging out...", status=200, mimetype='application/text')
#


@labels_module.route('/label_tweet/<int:tweet_id>/<int:label>/<int:labeled_by>', methods=['POST'])
def label_tweet(tweet_id, label, labeled_by):
    label = Label(tweet_id, label, labeled_by)
    label_result = Label.query.filter_by(tweet_id=tweet_id, labeled_by=labeled_by).first()

    if label_result is None:
        db.session.add(label)
        db.session.commit()
        return Response('Tweet labeled successfully ', status=200, mimetype='application/text')
    else:
        return Response('Tweet already labeled by user', status=409, mimetype='application/text')


@labels_module.route('/store-tweet', methods=['POST'])
def store_tweet():
    data = request.json
    id = data["id"]
    text = data["text"]
    req = request
    tweet = Tweet(id, text)
    tweet_result = Tweet.query.filter_by(id=request.json['id']).first()

    if tweet_result is None :
        db.session.add(tweet)
        db.session.commit()
        return Response('Tweet stored successfully ' + str(len(text)), status=200, mimetype='application/text')
    else:
        return Response('Tweet already exists', status=409, mimetype='application/text')



#
# @auth_module.before_request
# def before_request():
#     g.user = current_user
#
#
# @login_manager.user_loader
# def load_user(id):
#     return User.query.get(int(id))
