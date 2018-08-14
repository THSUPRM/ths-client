(function() {

    'use strict';

    angular
        .module('thsClient')
        .controller('AboutCtrl', [
            '$scope',
            '$log',
            'AboutService',
            'AppService',
            '$state',
            AboutController
        ]);

    function AboutController($scope, $log, AboutService, AppService, $state) {
        $log.log('Hello World from the About Controller using the $log Service');
        //AppService.saveState('app.about');
        localStorage.setItem("state", $state.current.name);

    }
})();