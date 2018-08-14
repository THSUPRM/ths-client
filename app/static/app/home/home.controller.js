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
            HomeController
        ]);

    function HomeController($scope, $log, HomeService, AppService, $state) {
        $log.log('Hello World from the Home Controller using the $log Service');
        // AppService.saveState('app.home');
        localStorage.setItem("state", $state.current.name);
        var unlabeledTweets = 0;
        var labeledTweets =0;
        HomeService.tweetsToLabel(AppService.currentUser.id).then(function () {
            unlabeledTweets = HomeService.unlabeled();
            $scope.tweetsToLabel = unlabeledTweets;
        });
        HomeService.tweetsLabeled(AppService.currentUser.id).then(function () {
            labeledTweets = HomeService.labeled();
            $scope.labeledTweets = labeledTweets;
        });





    }
})();