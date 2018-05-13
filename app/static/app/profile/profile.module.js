(function() {
    /**
     * Created by diegofigs on 5/18/17.
     */
    'use strict';

    angular
        .module('thsClient.profile', [])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Profile
        ]);

    function Profile($stateProvider, $urlRouterProvider) {

    }
})();
