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
        $log.log('Hello World from the Auth Controller using the $log service');
    }
})();