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
    handler: async (req, reply) => {
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
            return data;
        } catch (err) {
            return err;
        }
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
