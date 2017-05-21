(function() {
    /**
     * Created by diegofigs on 5/11/17.
     */
    'use strict';

    angular
        .module('thsClient', [
            'ui.router'
        ]);
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
                    name: 'app.home',
                    url: '',
                    templateUrl: '/static/partials/home.html'
                })
                .state({
                    name: 'app.about',
                    url: '',
                    templateUrl: '/static/partials/about.html'
                })
                .state({
                    name: 'app.login',
                    url: '',
                    templateUrl: '/static/partials/login.html'
                })
                .state({
                    name: 'app.register',
                    url: '',
                    templateUrl: '/static/partials/register.html'
                });

            $urlRouterProvider.when('/', '/home');
            $urlRouterProvider.otherwise('/home');
        }

})();