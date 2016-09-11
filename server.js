/**
* Dependencies.
*/
var Hapi = require('hapi');
// Create a new server
var server = new Hapi.Server();


// Setup the server with a host and port
server.connection({
    port: parseInt(process.env.PORT, 10) || 7777,
    host: 'localhost'
});

// Export the server to be required elsewhere.
module.exports = server;

//Setup Socket.io
var io = require('socket.io')(server.listener);
global.socketIO = io;

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

//Setup the views engine and folder
server.views({
    engines: {
        html: require('swig')
    },
    path: './server/views'
});

server.register([
    {
        register: require("good"),
        options: {
            opsInterval: 5000,
            reporters: [{
                reporter: require('good-console'),
                args:[{ ops: '*', request: '*', log: '*', response: '*', 'error': '*' }]
            }]
        }
    },
    {   //user defined pligins
        register: require('./server/assets.js')
    },
    {
        register: require('./server/index.js')
    }

], function () {
    //Start the server
    server.start(function() {
        //Log to the console the host and port info
        console.log('Server started at: ' + server.info.uri);
    });
});
