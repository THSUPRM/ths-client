(function() {

    'use strict';

    angular
        .module('thsClient.profile', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Profile
        ]);

    function Profile($stateProvider, $urlRouterProvider) {

    }
})();
