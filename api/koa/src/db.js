const db = require("mysql");
const yenv = require("yenv");

const env = yenv();

const pool  = db.createPool({
  connectionLimit : 10,
  host            : env.DATABASE.SERVER,
  database        : env.DATABASE.NAME,
  user            : env.DATABASE.USERNAME,
  password        : env.DATABASE.PASSWORD
});

module.exports = pool;