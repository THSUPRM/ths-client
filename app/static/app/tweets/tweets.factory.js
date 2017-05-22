(function() {

    'use strict';

    angular
        .module('thsClient.tweets')
        .factory('TweetsService', [
            '$http',
            '$log',
            TweetsService
        ]);

    function TweetsService($http, $log) {
        var service = {
            loadTweet: loadTweet,
            saveLabel: saveLabel
        };
        return service;


        function loadTweet(){
            var tweetData = {content:null};
            $http.get("tweets.json").then(function(response) {
                tweetData = data;
            });
            return tweetData;
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