const express = require("express");
const yenv = require("yenv");
const db = require("./db");

const app = express();
const env = yenv();

app.get("/", (req, res) => {
    db.query("SELECT * FROM employees LIMIT 1000", (err, data, fields) => {
        if (err)
            res.status(500).send({
                error: err.name,
                message: err.message,
                statusCode: 500
            });
        else res.send(data);
    });
});

app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}!`);
});
