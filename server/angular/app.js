(function () {
    'use strict';

    angular
        .module('app', ['ngRoute','ui.bootstrap'])
        .config(config)

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'views/task/task1.html',
                controllerAs: 'rksv'
            })                
            .when('/404', {
                title : '404 ',
                controller: '404Controller',
                templateUrl: 'views/404.html',
                controllerAs: 'rksv'
            })

            .otherwise({ redirectTo: '/404' });
    
    }
})();
