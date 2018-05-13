(function() {
    /**
     * Created by diegofigs on 5/19/17.
     */
    'use strict';

    angular
        .module('thsClient')
        .factory('ProfileService', [
            '$log',
            '$http',
            ProfileService
        ]);

    function ProfileService($log, $http) {
        var currentUser = null;
        var loggedIn = false;
        var service = {
            currentUser: currentUser,
            isLoggedIn: isLoggedIn,
            logout: logout,
        };
        return service;

        /*
        * Implementation Details
        */

        function isLoggedIn() {
            return service.currentUser !== null;
        }

        function logout() {
            $log.log('Logging Out: ' + this.currentUser.email);

            service.currentUser = null;
            return $http.get('/auth/logout')
                .then(logoutComplete)
                .catch(logoutError);
            function logoutComplete(response) {
                $log.log('Logged out succesfully!');
            }
            function logoutError(error){
                $log.log('Logout failed. Response: ' + error);
            }

        }
    }

}());

