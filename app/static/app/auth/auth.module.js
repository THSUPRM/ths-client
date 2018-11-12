(function() {

    'use strict';

    angular
        .module('thsClient.auth', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Auth
        ]);

    function Auth($stateProvider, $urlRouterProvider) {

    }
})();
