(function() {

    'use strict';

    angular
        .module('thsClient', [
            'ui.router',
            'ngCookies',
            'thsClient.tweets',
            'thsClient.auth',
            'ngMaterial',
            'ngMessages'
        ])
        .config([
            '$locationProvider',
            '$stateProvider',
            '$urlRouterProvider',
            App
          ]);

        function App($locationProvider, $stateProvider, $urlRouterProvider) {
            // HTML5 Mode for compatibility with Flask
            $locationProvider.html5Mode(true);

            // State declarations
            $stateProvider
                .state({
                    name: 'app',
                    abstract: true,
                    url: '/',
                    templateUrl: '/static/app.html',
                    controller: 'AppCtrl'
                })
                .state({
                    name: 'app.login',
                    url: '',
                    templateUrl: '/static/partials/login.html',
                    controller: 'AuthCtrl'
                })
                .state({
                    name: 'app.home',
                    url: '',
                    templateUrl: '/static/partials/home.html',
                    controller: 'HomeCtrl'
                })
                .state({
                    name: 'app.about',
                    url: '',
                    templateUrl: '/static/partials/about.html',
                    controller: 'AboutCtrl'
                })
                .state({
                    name: 'app.register',
                    url: '',
                    templateUrl: '/static/partials/register.html',
                    controller: 'AuthCtrl'
                })
                .state({
                    name: 'app.tweets',
                    url: '',
                    templateUrl: '/static/partials/tweets.html',
                    controller: 'TweetsCtrl'
                })
                .state({
                    name: 'app.profile',
                    url:'',
                    templateUrl: '/static/partials/edit.html',
                    controller: 'ProfileCtrl'
                });

            $urlRouterProvider.when('/', '/home');
            $urlRouterProvider.otherwise('/home');
        }

})();