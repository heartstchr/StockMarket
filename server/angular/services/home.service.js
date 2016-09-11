(function () {
    'use strict';

    angular
    .module('app')
    .factory('rksvService', rksvService);

    rksvService.$inject = ['$http'];
    function rksvService($http) {
        var service = {};
        var baseUrl='http://kaboom.rksv.net'

        service.GetAll = GetAll;
        service.GetStatus = GetStatus;

        return service;

        function GetStatus() {
            return $http.get(baseUrl+'/api')
                        .then(handleSuccess, handleError('Error getting all status'));
        }

        function GetAll() {
            return $http.get(baseUrl+'/api/historical/?interval=1')//?interval=1
                        .then(handleSuccess, handleError('Error getting historical'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
