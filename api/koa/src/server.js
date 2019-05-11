const Koa = require("koa");
const Router = require("koa-router");
const yenv = require("yenv");
const db = require("./db");

const app = new Koa();
const router = new Router();
const env = yenv();

router.get("/", async (ctx, next) => {
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
        ctx.body = data;
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            error: err.name,
            message: err.message,
            statusCode: 500
        };
    }
});

app.use(router.routes())
    .use(router.allowedMethods())
    .listen(env.PORT, () => {
        console.log(`Server listening on port ${env.PORT}!`);
    });
