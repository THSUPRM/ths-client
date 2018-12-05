(function() {

    'use strict';

    angular
        .module('thsClient')
        .controller('HomeCtrl', [
            '$scope',
            '$log',
            'HomeService',
            'AppService',
            '$state',
            '$interval',
            HomeController
        ]);

    function HomeController($scope, $log, HomeService, AppService, $state, $interval) {

        $scope.currentUser = AppService.currentUser;
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

        $log.log('Hello World from the Home Controller using the $log Service');
        localStorage.setItem("state", $state.current.name);
        var unlabeledTweets = 0;
        var labeledTweets =0;
        HomeService.tweetsToLabel(AppService.currentUser.id).then(function () {
            unlabeledTweets = HomeService.unlabeled();

            $scope.tweetsToLabel = unlabeledTweets;
            $scope.toLabelCounter = unlabeledTweets;
            // if (unlabeledTweets > 0) {
            //     $interval(updateToLabelCounter, 1, HomeService.unlabeled());
            // }
        });
        HomeService.tweetsLabeled(AppService.currentUser.id).then(function () {
            labeledTweets = HomeService.labeled();
            $scope.labeledTweets = labeledTweets;
            $scope.labeledCounter = labeledTweets;
            // if (labeledTweets > 0) {
            //     $interval(updateLabeledCounter, 3, $scope.labeledTweets);
            // }
        });
        HomeService.positiveTweets(AppService.currentUser.id).then(function () {
            labeledTweets = HomeService.positive();
            $scope.positiveCounter = labeledTweets;
            // if (labeledTweets > 0) {
            //     $interval(updatePositiveCounter, 3, labeledTweets);
            // }
        });
        HomeService.neutralTweets(AppService.currentUser.id).then(function () {
            labeledTweets = HomeService.neutral();
            $scope.neutralCounter = labeledTweets;
            // if (labeledTweets > 0) {
            //     $interval(updateNeutralCounter, 3, labeledTweets);
            // }
        });
        HomeService.negativeTweets(AppService.currentUser.id).then(function () {
            labeledTweets = HomeService.negative();
            $scope.negativeCounter = labeledTweets;
            // if (labeledTweets > 0) {
            //     $interval(updateNegativeCounter, 3, labeledTweets);
            // }
        });

    }
})();