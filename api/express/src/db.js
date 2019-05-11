const util = require("util");
const db = require("mysql");
const yenv = require("yenv");

const env = yenv();

const pool = db.createPool({
    connectionLimit: env.DATABASE.LIMIT,
    host: env.DATABASE.SERVER,
    database: env.DATABASE.NAME,
    user: env.DATABASE.USERNAME,
    password: env.DATABASE.PASSWORD,
    waitForConnections: false
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused.");
        }
    }
    console.log(`Connected as id ${connection.threadId}`);

    if (connection) connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
