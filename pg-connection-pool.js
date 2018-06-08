"use strict";
const pg = require("pg");

const pool = new pg.Pool({
    user: 'postgres',
    password: 'cardinal',
    host: 'localhost',
    port: 5432,
    //DON'T FORGET TO CHANGE THE DATABASE NAME!!!!
    database: 'expressshopdb',
    ssl: false
});

module.exports = pool;