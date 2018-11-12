(function() {

    'use strict';

    angular
        .module('thsClient.auth')
        .factory('AuthService', [
            '$http',
            '$log',
            '$state',
            'AppService',
            AuthService

        ]);

    function AuthService($http, $log, AppService) {

        var service = {
            currentUser: AppService.currentUser,
            isLoggedIn: AppService.isLoggedIn,
            login: login,
            logout: logout,
            register: register
        };
        return service;

        /*
        * Implementation Details
        */
        var currentUser = null;
        function isLoggedIn() {
            return AppService.isLoggedIn;
        }

        function login(email, password) {
            var user = {
                email: email,
                password: password
            };
            return $http.post('/auth/login', user)
                .then(loginComplete)
                .catch(loginError);

            function loginComplete(response) {
               currentUser = response.data;
                $log.log('Login Complete: '+ user);
                $log.log(response.data);
                //$log.log(AppService.loggedIn);

                return response;
            }

            function loginError(response) {
                $log.log('Login Error');
                $log.log(response.data);
                return response;
                }
        }

        function logout() {
            $log.log('Logging Out: ' + AppService.currentUser.email);
            AppService.currentUser = null;
        }

        function register(first, last, username, email, password) {
            var user = {
                first: first,
                last: last,
                username: username,
                email: email,
                password: password
            };
            return $http.post('/auth/register', user)
                .then(registerComplete)
                .catch(registerError);

            function registerComplete(response) {
                $log.log('Register Complete');
                $log.log(response.data);
                return response;
            }

            function registerError(response) {
                $log.log('Register Error');
                $log.log(response);
                return response;

            }
        }
    }
})();