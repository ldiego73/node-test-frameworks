const Hapi = require("@hapi/hapi");
const yenv = require("yenv");
const db = require("./db");

const env = yenv();
const app = Hapi.server({
    port: env.PORT,
    host: "0.0.0.0"
});

app.route({
    method: "GET",
    path: "/",
    handler: (req, reply) => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM employees LIMIT 1000",
                (err, data, fields) => {
                    if (err) reject(err);
                    else resolve(data);
                }
            );
        });
    }
});

const start = async () => {
    try {
        await app.start();
        console.log(`Server listening on ${env.PORT}!`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
