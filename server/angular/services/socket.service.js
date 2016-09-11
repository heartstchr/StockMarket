(function () {
    'use strict';

    angular
    .module('app')
    .factory('socketService', socketService);

    socketService.$inject = ['$rootScope'];
    function socketService($rootScope) {


        // var socket = io.connect();
        // socket.on('news', function (data) {
        //   console.log(data);
        //   socket.emit('my other event', { my: 'data' });
        // });

        var baseUrl='http://kaboom.rksv.net/';
        var socket = io(baseUrl+'watch');
        return {
          on: function (eventName, callback) {
            socket.on(eventName, function () { 
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
            });
          },
          emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
              var args = arguments;
              var CLIENT_ACKNOWLEDGEMENT = 1;
              $rootScope.$apply(function () {
                if (callback) {
                  callback.apply(socket, CLIENT_ACKNOWLEDGEMENT);
                }
              });
            })
          }
        };
    }

})();