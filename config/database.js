const mysql = require('mysql');
const util = require('util')
const pool = mysql. createPool({
    conectionlimit: 10,
    host:'localhost',
    user:'root',
    password:'',
    database:'recursoshumanos',
    port: '3306'

})
pool.query = util.promisify(pool.query);
module.exports = pool;