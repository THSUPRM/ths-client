import sqlite3
from datetime import datetime
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession, Row
from pyspark.sql.functions import sort_array


def get_spark_session_instance(sparkConf):
    if 'sparkSessionInstance' not in globals():
        globals()['sparkSessionInstance'] = SparkSession.builder.config(
            conf=sparkConf).enableHiveSupport().getOrCreate()
    return globals()['sparkSessionInstance']


def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(e)
    return None


def insert_tweet(conn, tweet):
    sql = '''INSERT OR IGNORE INTO tweets(tweet_id, text, date_created, date_modified) VALUES(?,?,?,?) '''
    cur = conn.cursor()

    tw = (str(tweet.twitter_id), tweet.full_text, str(tweet.inserted_tweet), datetime.today().__str__())

    try:
        cur.execute(sql, tw)
    except sqlite3.Error as e:
        print(e)

    return cur.lastrowid


def main():
    database = "/home/manuelr/ths-client/app/app.db"
    conn = create_connection(database)
    sc = SparkContext(appName='Insert Tweets')
    spark = get_spark_session_instance(sc.getConf())
    cur = conn.cursor()

    result = cur.execute(''' SELECT MAX(date_modified), date_created FROM tweets ''').fetchone()

    if result[1] is None:
        max_date = '2018-10-01 00:00:00.000'
    else:
        max_date = result[1]

    spark.sql('use thsfulltext')
    df = spark.sql('select twitter_id, full_text, inserted_tweet from tweet')
    df = df.filter(df.inserted_tweet.between(str(max_date), str(datetime.today()))).orderBy(df.inserted_tweet.asc())
    tweets = df.collect()
    count = len(tweets)
    sql_select = ''' SELECT tweet_id FROM tweets WHERE tweet_id = ?'''
    limit = 0
    index = 0
    with conn:
        while limit < 50:

            while index < count and cur.execute(sql_select, [str(tweets[index].twitter_id)]).fetchone() is not None:

                index = index + 1
                print('tweet already inserted')

            if index >= count:
                print('There are no more tweets to insert')
                break
            insert_tweet(conn, tweets[index])

            limit = limit + 1
            index = index + 1


if __name__ == '__main__':
    main()
