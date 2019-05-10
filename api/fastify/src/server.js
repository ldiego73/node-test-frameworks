const fastify = require("fastify");
const yenv = require("yenv");
const db = require("./db");

const app = fastify({ logger: false });
const env = yenv();

app.get("/", async (req, reply) => {
  db.query("SELECT * FROM employees LIMIT 1000", (err, data, fields) => {
    if (err)
      reply.code(500).send({
        error: err.name,
        message: err.message,
        statusCode: 500
      });
    else reply.send(data);
  });
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
