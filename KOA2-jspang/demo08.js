const Koa = require("koa");
const Router = require("koa-router")

const app = new Koa();
const router = new Router();

router.get("/", async ctx => {
    ctx.body = "hello Chris";
}).get("/todo", async ctx => {
    ctx.body = "todo page";
})

app.use(router.routes()).use(router.allowedMethods);

app.listen(3000, () => {
    console.log("[SERVER] is starting at port 3000.")
})
