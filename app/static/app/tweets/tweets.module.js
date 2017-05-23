(function() {

    'use strict';

    angular
        .module('thsClient.tweets', [])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Tweets
        ]);

    function Tweets($stateProvider, $urlRouterProvider) {

    }
})();
