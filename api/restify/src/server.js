const restify = require("restify");
const yenv = require("yenv");
const db = require("./db");

const app = restify.createServer();
const env = yenv();

app.get("/", (req, res) => {
    db.query("SELECT * FROM employees LIMIT 1000", (err, data, fields) => {
        if (err) {
            res.send(500, err);
        } else {
            res.send(data);
        }
    });
});

app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}!`);
});
