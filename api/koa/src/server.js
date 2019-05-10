const Koa = require("koa");
const Router = require("koa-router");
const yenv = require("yenv");
const db = require("./db");

const app = new Koa();
const router = new Router();
const env = yenv();

router.get("/", (ctx, next) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM employees LIMIT 1000", (err, data, fields) => {
      if (err) {
        ctx.status = 500;
        ctx.body = {
          error: err.name,
          message: err.message,
          statusCode: 500
        };
      } else {
        ctx.body = data;
      }

      resolve();
    });
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}!`);
  });
