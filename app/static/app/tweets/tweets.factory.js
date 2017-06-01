(function() {

    'use strict';

    angular
        .module('thsClient.tweets')
        .factory('TweetsService', [
            '$http',
            '$log',
            TweetsService
        ]);

    function TweetsService($http, $log, $filter) {
        var tweetData = {content:null};
        var service = {
            loadTweet: loadTweet,
            saveLabel: saveLabel
        };
        loadTweet(); //To load the json at the start
        return service;


        function loadTweet(){
            $http.get("/tweets.json").then(function(response) {
                tweetData.content = data;
            });
        }

        function loadSingleTweet(tweetID){
            var result = $filter('filter')(tweetData.content, {id:tweetID})[0];
            return result;
        }

        function saveLabel(id, label){
            var newLabel = id + " : " + label;
            return $http.post('', newLabel)
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