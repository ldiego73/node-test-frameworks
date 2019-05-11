const express = require("express");
const yenv = require("yenv");
const db = require("./db");

const app = express();
const env = yenv();

app.get("/", async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM employees LIMIT 1000");
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
