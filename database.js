const Database = require('better-sqlite3');

const db = new Database('explorelocal.db', { verbose: console.log });

module.exports = db;
