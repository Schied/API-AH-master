const   config = require('./util/keys'),
        server = require('./server');

server.listen(config.PORT);
console.log('Servidor escuchando en puerto ' + config.PORT);

server.on('error', err => {
    console.error(err);
});