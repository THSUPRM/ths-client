(function() {
    /**
     * Created by lgrs on 5/12/18.
     */
    'use strict';

    angular
        .module('thsClient')
        .factory('HomeService', [
            '$log',
            '$http',
            HomeService
        ]);

    function HomeService($log, $http) {
        var currentUser = null;
        var loggedIn = false;
        var unlabeledTweets = 0;
        var labeledTweets = 0;
        var service = {
            currentUser: currentUser,
            isLoggedIn: isLoggedIn,
            logout: logout,
            tweetsToLabel: tweetsToLabel,
            tweetsLabeled: tweetsLabeled,
            unlabeled:unlabeled,
            labeled:labeled
        };
        return service;

        /*
        * Implementation Details
        */

        function unlabeled(){
            return unlabeledTweets;
        }

        function labeled() {
            return labeledTweets;
        }

        function tweetsToLabel(id){
            return $http.get("/home/tweets-to-label/" + id).then(function(response){
                unlabeledTweets = response.data;
            }).catch(function (reason) {
                $log.log('Error loading tweets. Reason: '+ reason.data);
            });
        }

        function tweetsLabeled(id){
            return $http.get("/home/labeled-tweets-by-user/" + id).then(function(response){
                labeledTweets = response.data;
            }).catch(function (reason) {
                $log.log('Error loading tweets. Reason: '+ reason.data);
            });
        }


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

