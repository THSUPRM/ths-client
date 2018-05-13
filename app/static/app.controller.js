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
        $log.log('Hello World from the App Controller using the $log Service');
        //$log.log(AppService.service.currentUser);
        $scope.isLoggedIn = AppService.isLoggedIn();
        $scope.currentUser = AppService.currentUser;
        $scope.logout = function(){
            AppService.logout();
            $scope.isLoggedIn = false;
            $scope.currentUser = {};
            $state.go('app.login');
        }


    }
})();