'use strict'
const http = require('http');
const debug = require('debug')('nodestr:server');
const app = require('../src/app')


const port = normalizePort(process.env.PORT || '9610');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log("API rodando na porta " + port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port))
        return val;

    if (port >= 0)
        return port;

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Porta ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requer privilégios elevados');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' já está em uso');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'porta ' + addr.port;
    debug('Escutando em  ' + bind);
}