(function() {
    /**
     * Created by lgrs on 5/12/18.
     */
    'use strict';

    angular
        .module('thsClient.profile', ['ngMaterial', 'ngMessages'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            Home
        ]);

    function Home($stateProvider, $urlRouterProvider) {

    }
})();
