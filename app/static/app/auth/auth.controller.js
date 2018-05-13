(function() {
    /**
 * Created by diegofigs on 5/19/17.
 */
    'use strict';

    angular
        .module('thsClient.auth')
        .controller('AuthCtrl', [
            '$scope',
            '$log',
            '$state',
            'AuthService',
            'AppService',
            AuthController
        ]);

    function AuthController($scope, $log,$state, AuthService, AppService) {
        $log.log('Hello World from the Auth Controller using the $log service!!!');
                    $log.log(AppService.currentUser);

        if(AppService.currentUser.username !== undefined ){
            $scope.$parent.isLoggedIn = true;
            $scope.$parent.currentUser = AppService.currentUser;
            if(AppService.loadState() !== undefined){
                $state.go(AppService.loadState());
            } else{
                $state.go('app.home');
            }
        }
        $scope.login = function(user, pass) {
            $log.log("Trying login...."+ user);
            var er;
            AuthService.login(user, pass).then(function (response) {
                $log.log('Response is: ' + response);
                if(response.status === 200){
                    $scope.$parent.currentUser = response.data;
                    AppService.setCookieData(response.data);
                    $log.log(response.data)
                    AppService.currentUser = response.data;
                    $scope.$parent.isLoggedIn = true;
                    $state.go('app.home');

                }else{
                    $scope.showError = true;
                }
            });

        };
        $scope.register = function(first, last, username, email, password){
            $log.log("Registering...");
            AuthService.register(first, last, username, email, password).then(function (response) {
                if(response.status === 200){
                    AuthService.login(email, password);
                    $scope.$parent.currentUser = response.data;
                    AppService.currentUser = response.data;
                    $scope.$parent.isLoggedIn = true;
                    $state.go('app.home');
                    //$state.reload('app');
                }else{
                    $scope.m = response.data;
                }
            });

        }


    }
})();
