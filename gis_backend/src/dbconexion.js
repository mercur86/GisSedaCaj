const pgp = require('pg-promise')();

const dbConfig = {
    host: '44.193.209.119',
    port: 5436,
    database: 'geocatastro_20251114',
    user: 'postgres',
    password: '15#YQd}4C[/X',   // No hay problema con caracteres especiales
    ssl: false                 // agrega true si tu servidor lo requiere
};

const db = pgp(dbConfig);

module.exports = db;