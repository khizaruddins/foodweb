const StaticServer = require('static-server');

const server = new StaticServer({
    rootPath: '../webfront',
    port: 3000
});

server.start(function() {
    console.log('Server Started on port '+ server.port);
});