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
            AuthController
        ]);

    function AuthController($scope, $log) {
        $log.log('Hello World from the Auth Controller using the $log service');
    }
})();
