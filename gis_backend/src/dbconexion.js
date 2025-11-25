const pgp = require('pg-promise')();
// const host = '176.52.142.84',
//     port = 9876,
//     database = 'sisgeco_comercial',
//     user = 'sigiluser',
//     password = 'ñ6u3$&2C0!j4@cG';

const host = '44.193.209.119',
    port = 5436,
    database = 'sisgeco_comercial',
    user = 'postgres',
    password = '15#YQd}4C[/X';

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

module.exports = db;