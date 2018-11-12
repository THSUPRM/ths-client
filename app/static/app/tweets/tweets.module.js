(function() {

    'use strict';

    angular
        .module('thsClient.tweets', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Tweets
        ]);

    function Tweets($stateProvider, $urlRouterProvider) {

    }
})();
