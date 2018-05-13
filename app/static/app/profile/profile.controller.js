(function() {

    'use strict';

    angular
        .module('thsClient')
        .controller('ProfileCtrl', [
            '$scope',
            '$log',
            'ProfileService',
            'AppService',
            '$state',
            ProfileController
        ]);

    function ProfileController($scope, $log, ProfileService, AppService, $state) {
        $log.log('Hello World from the Profile Controller using the $log Service');
        AppService.saveState('app.profile');
        $scope.changeValues = function(){
            if($scope.first !== undefined)
                AppService.updateName($scope.first);
            if($scope.last !== undefined)
                AppService.updateLast($scope.last);
            if($scope.email !== undefined)
                AppService.updateEmail($scope.email);
            AppService.setCookieData(AppService.currentUser);

        };
    }
})();