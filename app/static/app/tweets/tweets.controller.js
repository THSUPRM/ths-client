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
            '$interval',
            'HomeService',
            TweetsController

        ])
        ;

    function TweetsController($scope, $log, TweetsService, AppService, $state, $interval, HomeService)  {

        $scope.labeledCounter = 0;
        $scope.toLabelCounter = 0;
        $scope.negativeCounter = 0;
        $scope.positiveCounter = 0;
        $scope.neutralCounter = 0;

        var updateLabeledCounter = function () {
              $scope.labeledCounter ++;
        };

        var updateToLabelCounter = function(){
                $scope.toLabelCounter++;
		};
        var updateNegativeCounter = function(){
                $scope.negativeCounter++;
		};
        var updatePositiveCounter = function(){
                $scope.positiveCounter++;
		};
        var updateNeutralCounter = function(){
                $scope.neutralCounter++;
		};

        var unlabeledTweets = 0;
        var labeledTweets =0;
        HomeService.tweetsToLabel(AppService.currentUser.id).then(function () {
                unlabeledTweets = HomeService.unlabeled();

                $scope.tweetsToLabel = unlabeledTweets;
                if (unlabeledTweets > 0) {
                    $interval(updateToLabelCounter, 1, HomeService.unlabeled());
                }
            });
            HomeService.tweetsLabeled(AppService.currentUser.id).then(function () {
                labeledTweets = HomeService.labeled();
                $scope.labeledTweets = labeledTweets;
                if (labeledTweets > 0) {
                    $interval(updateLabeledCounter, 3, $scope.labeledTweets);
                }
            });
            HomeService.positiveTweets(AppService.currentUser.id).then(function () {
                labeledTweets = HomeService.positive();
                if (labeledTweets > 0) {
                    $interval(updatePositiveCounter, 3, labeledTweets);
                }
            });
            HomeService.neutralTweets(AppService.currentUser.id).then(function () {
                labeledTweets = HomeService.neutral();
                if (labeledTweets > 0) {
                    $interval(updateNeutralCounter, 3, labeledTweets);
                }
            });
            HomeService.negativeTweets(AppService.currentUser.id).then(function () {
                labeledTweets = HomeService.negative();
                if (labeledTweets > 0) {
                    $interval(updateNegativeCounter, 3, labeledTweets);
                }
            });


        $scope.number = 0;
        $scope.index = 0;
        $scope.slide = false;

        var move = function () {
            $scope.slide = !$scope.slide;
        };


        TweetsService.userId = AppService.currentUser.id;
        localStorage.setItem("state", $state.current.name);
        var index = 0;
        var tweets = {};

        TweetsService.getTweets(AppService.currentUser.id).then(function () {
            tweets = TweetsService.tweets();
            $scope.tweetsLeft = tweets.length;
            $scope.tweet = tweets[index];
            $scope.hasTweets = index < tweets.length;

             });



        $log.log('Scope tweets: ' + $scope.tweets);

        $scope.submit = function (tweet_id, classification) {

             move();
            TweetsService.saveLabel(tweet_id, classification, AppService.currentUser.id);
            $log.log(tweet_id);
            index++;
            $scope.tweet = tweets[index];
            $scope.tweetsLeft--;
            $scope.labeledCounter++;
            $scope.toLabelCounter--;
            if(classification === 1)
                $scope.positiveCounter++;
            else if(classification === 2)
                $scope.neutralCounter++;
            else
                $scope.negativeCounter++;


            $scope.hasTweets = index < tweets.length;
            $interval(move,500, 1);



        };

        $log.log('Hello World from the Tweets Controller using the $log service');
    }


})();