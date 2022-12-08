const { Pool } = require('pg');
const config = require('../../util/keys');
const url = require('url');
const params = url.parse(config.DB);
const auth = params.auth.split(':');

const pool = new Pool({
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
});

module.exports = pool;
