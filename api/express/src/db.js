const db = require("mysql2");
const yenv = require("yenv");

const env = yenv();

const pool = db.createPool({
    host: env.DATABASE.SERVER,
    database: env.DATABASE.NAME,
    user: env.DATABASE.USERNAME,
    password: env.DATABASE.PASSWORD,
    connectionLimit: env.DATABASE.LIMIT,
    queueLimit: 0
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

    if (connection) pool.releaseConnection(connection);
    return;
});

module.exports = pool.promise();
