(function() {

    'use strict';

    angular
        .module('thsClient')
        .controller('AppCtrl', [
            '$scope',
            '$log',
            AppController
        ]);

    function AppController($scope, $log) {
        $log.log('Hello World from the App Controller using the $log Service');
    }
})();