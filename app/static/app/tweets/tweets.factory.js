(function() {

    'use strict';

    angular
        .module('thsClient.tweets')
        .factory('TweetsService', [
            '$http',
            '$log',
            'AppService',
            TweetsService
        ]);

    function TweetsService($http, $log, $filter, AppService) {
        var tweetData = {content:null};
        //var tweets = null;
        var userId = null;
        var service = {
 //           loadTweet: loadTweet,
            saveLabel: saveLabel,
            getTweets: getTweets,
            tweets : tweets
        };
        //getTweets();//loadTweet(); //To load the json at the start
        return service;


        // function loadTweet(){
        //     $http.get("/tweets.json").then(function(response) {
        //         tweetData.content = data;
        //     });
        // }
        function tweets(){
            return tweetData;
        }
        function getTweets(id){
            return $http.get("/tweets/assign_tweets/" + id).then(function(response){
                tweetData = response.data;
            }).catch(function (reason) {
                $log.log('Error loading tweets. Reason: '+ reason.data);
            });
            //$log.log("Tweets: " + tweets);
        }

        function loadSingleTweet(tweetID){
            var result = $filter('filter')(tweetData.content, {id:tweetID})[0];
            return result;
        }

        function saveLabel(tweetId, label, userId ){
            return $http.post('/labels/label_tweet/' + tweetId + '/' + label + '/' +userId)
                .then(labelComplete)
                .catch(labelError);
        }

        function labelComplete(response){
            $log.log('Label Recorded');
            $log.log(response.data);
        }

        function labelError(error){
            $log.log('Label Error');
            $log.log(error);
        }
    }
})();