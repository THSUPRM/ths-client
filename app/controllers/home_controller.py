from flask import request, Blueprint, Response

import csv
# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.tweets_model import Tweet
from app.models.labels_model import Label
import sqlite3
from datetime import datetime
# from pyspark import SparkConf, SparkContext
# from pyspark.sql import SparkSession, Row


# Define the blueprint: 'home', set its url prefix: app.url/home
home_module = Blueprint('home', __name__, url_prefix='/home')


@home_module.route('/labeled-tweets-by-user/<int:labeled_by>', methods=['GET'])
def labeled_tweets_by_user(labeled_by):
	labels = Label.query.filter_by(labeled_by=labeled_by).all()
	app.logger.info("Query Labels: " + str(labels))

	if len(labels) == 0:
		message = 'User has not labeled any tweets.'
		app.logger.error('GET /labels/get_labels-tweet HTTP/1.1 404 Not Found - ' + message)
		resp = Response(message, status=404, mimetype='application/text')
		return resp

	# result = '['
	# for label in labels:
	#     result += label.get_fields() + ' , '
	# result = result[0:len(result) - 2] + ']'
	result = str(len(labels))
	app.logger.info("Labels: " + result)

	return Response(result, status=200, mimetype='application/json')


@home_module.route('/tweets-to-label/<int:user_id>', methods=['GET'])
def tweets_to_label(user_id):
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
	app.logger.info("tweets_to_label: " + str(len(tweets_to_label)))

	result = str(len(tweets_to_label))

	return Response(result, status=200, mimetype="application/json")


