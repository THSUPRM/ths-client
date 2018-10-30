from flask import request, Blueprint, Response
import json
import csv
# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.tweets_model import Tweet
from app.models.labels_model import Label

# Define the blueprint: 'tweets', set its url prefix: app.url/tweets
tweets_module = Blueprint('tweets', __name__, url_prefix='/tweets')


@tweets_module.route('/get_tweet/<int:id>', methods=['GET'])
def get_tweet(id):

    tweet = Tweet.query.filter_by(id=id).first()
    if tweet is None:
        message = 'Tweet does not exist'
        app.logger.error('GET /tweets/get_tweet HTTP/1.1 404 Not Found - ' + message)
        resp = Response(message, status=404, mimetype='application/text')
        return resp
    app.logger.info("Tweet length: " + str(len(tweet.text)))
    return Response(tweet.get_fields(), status=200, mimetype='application/json')

#
# @auth_module.route('/logout')
# def logout():
#     logout_user()
#     return Response("Logging out...", status=200, mimetype='application/text')
#


@tweets_module.route('/assign_tweets/<int:user_id>', methods=['GET'])
def assign_tweets(user_id):
    tweets_ids_labeled_by = Label.query.filter_by(labeled_by=user_id).all()
    tweets = []
    #if len(tweets_ids_labeled_by) is not 0:
    for tweet in tweets_ids_labeled_by:
        tweets.append(tweet.tweet_id)
    app.logger.info("t_labeled_by: " + str(tweets))
    if tweets_ids_labeled_by:
        tweets_to_label = Tweet.query.filter(~Tweet.id.in_(tweets)).all()
    else:
        tweets_to_label = Tweet.query.all()
    app.logger.info("tweets_to_label: " + str(tweets_to_label))
    result = []
    for tweet in tweets_to_label:
        tw = {}
        tw['id'] = tweet.id
        tw['text'] = tweet.text
        result.append(tw)

    json_data = json.dumps(result)
    app.logger.info("tweets: " + json_data)
    if len(result) > 2:
        return Response(json_data, status=200, mimetype="application/json")
    else:
        return Response("No tweets to label", status=500, mimetype="application/text")


@tweets_module.route('/store-tweet', methods=['POST'])
def store_tweet():
    data = request.json
    id = data["id"]
    text = data["text"]
    req = request
    tweet = Tweet(id, text)
    tweet_result = Tweet.query.filter_by(tweet_id=request.json['id']).first()

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
