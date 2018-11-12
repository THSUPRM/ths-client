(function() {

    'use strict';

    angular
        .module('thsClient')
        .controller('AppCtrl', [
            '$scope',
            '$log',
            'AppService',
            '$state',
            AppController
        ]);

    function AppController($scope, $log, AppService, $state) {
        $log.log('Hello World from the App Controller using the $log Service '  + AppService.currentUser.username);

        $scope.currentUser = AppService.currentUser;
        if(AppService.currentUser.username !== undefined ){
            $scope.isLoggedIn = true;
            $scope.currentUser = AppService.currentUser;
            if(localStorage.getItem("state") !== undefined){
                //$state.go(AppService.loadState());
                $state.go(localStorage.getItem("state"));
            } else{
                $state.go('app.home');
            }
        }




        $scope.isLoggedIn = AppService.isLoggedIn();
        $scope.currentUser = AppService.currentUser;
        $scope.logout = function(){
            AppService.logout();
            $scope.isLoggedIn = false;
            $scope.currentUser = {};
            $state.go('app.login');
        };
        $log.log('isLoggedIn: '+ $scope.isLoggedIn);



    }
})();