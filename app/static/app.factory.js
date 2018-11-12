(function() {
    /**
     * Created by lgrs on 03/30/18.
     */
    'use strict';

    angular
        .module('thsClient')
        .factory('AppService', [
            '$log',
            '$http',
            '$cookies',
            AppService
        ]);

    function AppService($log, $http, $cookies) {
        var currentUser={};
        var loggedIn = false;
        var service = {
            currentUser: currentUser,
            isLoggedIn: isLoggedIn,
            logout: logout,
            saveState: saveState,
            loadState: loadState,
            setCookieData : setCookieData,
            getCookieData: getCookieData,
            clearCookieData: clearCookieData,
            updateName: updateName,
            updateLast: updateLast,
            updateEmail: updateEmail
        };
        getCookieData();
        isLoggedIn();
        console.log('AppService:');
        console.log(currentUser);
        return service;


        function saveState(state){
            $cookies.remove("state");
            $cookies.put("state", state);
            $log.log('State ' + state + ' saved.' );
        }
        function loadState(){
            return $cookies.get("state");
        }
        function setCookieData(user){
                currentUser = user;
                $log.log('cookies:');
                $log.log(user);
                $cookies.put("first", user.first);
                $cookies.put("last", user.last);
                $cookies.put("username", user.username);
                $cookies.put("email",user.email);
                $cookies.put("id", user.id);
        }

        function getCookieData(){
            currentUser.first = $cookies.get("first");
            currentUser.last = $cookies.get("last");
            currentUser.username = $cookies.get("username");
            currentUser.email = $cookies.get("email");
            currentUser.id = $cookies.get("id");
            $log.log('cookiesget:');
            $log.log(currentUser);
            return currentUser;
        }

        function clearCookieData() {
        $cookies.remove("first");
        $cookies.remove("last");
        $cookies.remove("username");
        $cookies.remove("email");
        $cookies.remove("id");
        $cookies.remove("state");
        }

        function isLoggedIn() {
            $log.log(service.currentUser.username !== undefined);
            return service.currentUser.username !== undefined;
        }

        function updateName(newName){
            var data = {
                username : currentUser.username,
                newName  : newName
            };
            return $http.post('/profile/update-name', data)
                .then(function () {
                    currentUser.first = newName;
                    return true;
                })
                .catch(updateError);
        }

        function updateLast(newLast){
            var data = {
                username : currentUser.username,
                newLast  : newLast
            };

            return $http.post('/profile/update-last', data)
                .then(function(){
                    currentUser.last = newLast;
                    return true;
                })
                .catch(updateError);
        }

        function updateEmail(newEmail){
            var data = {
                username : currentUser.username,
                newEmail  : newEmail
            };
            return $http.post('/profile/update-email', data);
        }

        function updateComplete(response) {

                $log.log('Update Complete');
                $log.log(response.data);
                return response;
            }

        function updateError(response) {
            $log.log('Update Error');
            $log.log(response);
            return false;
        }

        function logout() {
            $log.log('Logging Out: ' + service.currentUser.email);
            service.currentUser = {};
            clearCookieData();
            localStorage.clear();
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

