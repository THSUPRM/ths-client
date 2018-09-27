from flask import request, Blueprint, Response
import subprocess

import csv
# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.tweets_model import Tweet
from app.models.labels_model import Label
import sqlite3
from datetime import datetime
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession, Row


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

def getSparkSessionInstance(sparkConf):
	if('sparkSessionInstance' not in globals()):
		globals()['sparkSessionInstance'] = SparkSession.builder.config(conf=sparkConf).enableHiveSupport().getOrCreate()
	return globals()['sparkSessionInstance']

def create_connection(db_file):
	try:
		conn = sqlite3.connect(db_file)
		return conn
	except sqlite3.Error as e:
		app.logger.error(e)
	return None


def insert_tweet(conn, tweet):
	sql = '''INSERT OR IGNORE INTO tweets(id, text,date_created, date_modified) 
		VALUES(?,?,?,?) '''
	cur = conn.cursor()
	tw = (tweet.twitter_id, tweet.full_text, datetime.today().__str__(), datetime.today().__str__())
	try:
		cur.execute(sql,tw)
	except sqlite3.Error as e:
		print(e)

	return cur.lastrowid

@home_module.route('/get-tweets-from-hive/', methods=['GET'])
def get_tweets_from_hive():
	try:
		app.logger.info(subprocess.check_output(['spark-submit', 'test.py']))
		# database = "/home/manuelr/ths-client/app/app.db"
		# conn = create_connection(database)
		# sc = SparkContext(appName='Insert Tweets')
		# spark = getSparkSessionInstance(sc.getConf())
		# spark.sql('use thsfulltext')
		# df = spark.sql('select twitter_id, full_text from tweet limit 5000')
		# tweets = df.rdd.collect()
		# with conn:
		# 	for tweet in tweets:
		# 		insert_tweet(conn,tweet)
		return Response("Succeeded getting tweets from HIVE", status=200, mimetype="application/text")
	except:
			result = "Failed getting tweets from HIVE"

			return Response(result, status=500, mimetype="application/text")
