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
            '$mdDialog',
            ProfileController
        ]);

    function ProfileController($scope, $log, ProfileService, AppService, $state, $mdDialog) {
        $log.log('Hello World from the Profile Controller using the $log Service');
        $scope.validEmail = '';
        //AppService.saveState('app.profile');
        localStorage.setItem("state", $state.current.name);
        $scope.currentUser = AppService.currentUser;
        $scope.changeValues = function(){
            var isOk = true;
            if($scope.first !== undefined)
                AppService.updateName($scope.first);
                $mdDialog.hide("myDialog");
            if($scope.last !== undefined)
                AppService.updateLast($scope.last);
                $mdDialog.hide("myDialog");
            if($scope.email !== undefined)
                AppService.updateEmail($scope.email)
                    .then(function(){
                        $mdDialog.hide("myDialog");
                    })
                    .catch(function(){
                        $scope.validEmail = 'This email is already being used. Try another one';
                        isOk = false;
                    });

            AppService.setCookieData($scope.currentUser);
            if(isOk) {

            }
        };


        $scope.closeDialog = function() {
          $mdDialog.hide("myDialog");
        };
    $scope.showPrerenderedDialog = function(ev) {

    $mdDialog.show({

        contentElement: '#myDialog',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
    });

  };

    }
})();