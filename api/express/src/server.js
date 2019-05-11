const express = require("express");
const yenv = require("yenv");
const db = require("./db");

const app = express();
const env = yenv();

app.get("/", async (req, res) => {
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

        res.send(data);
    } catch (err) {
        res.status(500).send({
            error: err.name,
            message: err.message,
            statusCode: 500
        });
    }
});

app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}!`);
});
