(function() {
    /**
     * Created by diegofigs on 5/19/17.
     */
    'use strict';

    angular
        .module('thsClient.auth')
        .factory('AuthService', [
            '$http',
            '$log',
            AuthService
        ]);

    function AuthService($http, $log) {
        var currentUser = {};
        var service = {
            currentUser: currentUser,
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            register: register
        };
        return service;

        /*
        * Implementation Details
        */

        function isLoggedIn() {
            return this.currentUser !== {};
        }

        function login(email, password) {
            var user = {
                email: email,
                password: password
            };
            return $http.post('/login', user)
                .then(loginComplete)
                .catch(loginError);

            function loginComplete(response) {
                $log.log('Login Complete');
                $log.log(response.data);
            }

            function loginError(error) {
                $log.log('Login Error');
                $log.log(error);
            }
        }

        function logout() {
            $log.log('Logging Out: ' + this.currentUser.email);
            this.currentUser = {};
        }

        function register(email, password) {
            var user = {
                email: email,
                password: password
            };
            return $http.post('/register', user)
                .then(registerComplete)
                .catch(registerError);

            function registerComplete(response) {
                $log.log('Register Complete');
                $log.log(response.data);
            }

            function registerError(error) {
                $log.log('Register Error');
                $log.log(error);
            }
        }
    }
})();