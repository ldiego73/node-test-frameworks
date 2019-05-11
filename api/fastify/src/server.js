const fastify = require("fastify");
const yenv = require("yenv");
const db = require("./db");

const app = fastify({ logger: false });
const env = yenv();

app.get("/", async (req, reply) => {
    try {
        const [rows, fields] = await db.query(
            "SELECT * FROM employees LIMIT 1000"
        );
        let data = [];
        for (let i = 0, t = rows.length; i < t; i += 1) {
            data.push({
                id: rows[i].emp_no,
                nombres: rows[i].first_name,
                apellidos: rows[i].last_name,
                cumpleanios: new Date(rows[i].birth_date).getTime(),
                sexo: rows[i].gender,
                contratacion: new Date(rows[i].hire_date).getTime()
            });
        }
        reply.send(data);
    } catch (err) {
        reply.code(500).send({
            error: err.name,
            message: err.message,
            statusCode: 500
        });
    }
});

const start = async () => {
    try {
        await app.listen(env.PORT, "0.0.0.0");
        console.log(`Server listening on ${app.server.address().port}!`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
