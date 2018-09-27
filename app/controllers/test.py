import sqlite3
from datetime import datetime
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession, Row

def getSparkSessionInstance(sparkConf):
	if('sparkSessionInstance' not in globals()):
		globals()['sparkSessionInstance'] = SparkSession.builder.config(conf=sparkConf).enableHiveSupport().getOrCreate()
	return globals()['sparkSessionInstance']

def create_connection(db_file):
	try:
		conn = sqlite3.connect(db_file)
		return conn
	except sqlite3.Error as e:
		print(e)
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

def main():
	database = "/home/manuelr/ths-client/app/app.db"
	conn = create_connection(database)
	sc = SparkContext(appName='Insert Tweets')
	spark = getSparkSessionInstance(sc.getConf())
	spark.sql('use thsfulltext')
	df = spark.sql('select twitter_id, full_text from tweet limit 5000')
	tweets = df.rdd.collect()
	with conn:
		for tweet in tweets:
			insert_tweet(conn,tweet) 	
#	conn.commit()

if __name__ == '__main__':
	main()


