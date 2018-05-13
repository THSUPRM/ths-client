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
        AppService.saveState('app.tweets');

        TweetsService.getTweets(AppService.currentUser.id).then(function () {
            $scope.tweets = TweetsService.tweets();
            //$state.reload();
             });


        $log.log('Scope tweets: ' +$scope.tweets);

        $scope.submit = function (tweet_id, classification) {
            //$log.log('id: ' + id + '\nClassification: ' + classification);
            var label;
            if (classification === 'positive'){
                label = 1;
            }else if(classification === 'negative'){
                label = 0;
            }else{
                label = 2;
            }
            TweetsService.saveLabel(tweet_id, label, AppService.currentUser.id);
            $log.log(tweet_id);
            //$(id).hide();


        };

        $log.log('Hello World from the Tweets Controller using the $log service');
    }


})();