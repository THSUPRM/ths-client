(function() {

    'use strict';

    angular
        .module('thsClient.tweets')
        .controller('TweetsCtrl', [
            '$scope',
            '$log',
            'TweetsService',
            'AppService',
            '$state',
            TweetsController

        ])
        ;

    function TweetsController($scope, $log, TweetsService, AppService, $state) {

        TweetsService.userId = AppService.currentUser.id;
        $log.log("App Service: " + AppService);
        localStorage.setItem("state", $state.current.name);
        //AppService.saveState('app.tweets');
        var index = 0;
        var tweets = {};
        var tweetsLeft = 0;



        TweetsService.getTweets(AppService.currentUser.id).then(function () {
            tweets = TweetsService.tweets();
            //$state.reload();
            $scope.tweetsLeft = tweets.length;
            $scope.tweet = tweets[index];
            $scope.hasTweets = index < tweets.length;

             });



        $log.log('Scope tweets: ' + $scope.tweets);

        $scope.submit = function (tweet_id, classification) {
            //$log.log('id: ' + id + '\nClassification: ' + classification);
            // var label;
            // if (classification === 'Positive'){
            //     label = 1;
            // }else if(classification === 'Negative'){
            //     label = 0;
            // }else{
            //     label = 2;
            // }
            TweetsService.saveLabel(tweet_id, classification, AppService.currentUser.id);
            $log.log(tweet_id);
            //$(id).hide();
            index++;
            $scope.tweet = tweets[index];
            $scope.tweetsLeft--;
            $scope.hasTweets = index < tweets.length;


        };

        $log.log('Hello World from the Tweets Controller using the $log service');
    }


})();