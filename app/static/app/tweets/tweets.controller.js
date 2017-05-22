(function() {

    'use strict';

    angular
        .module('thsClient.tweets')
        .controller('TweetsCtrl', [
            '$scope',
            '$log',
            TweetsController
        ]);

    function TweetsController($scope, $log) {
        $log.log('Hello World from the Tweets Controller using the $log service');
    }
})();