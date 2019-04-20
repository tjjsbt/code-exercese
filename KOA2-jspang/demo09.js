const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

let home = new Router();
home.get("/chris", async ctx => {
    ctx.body = "hello chris";
}).get("/todo", ctx => {
    ctx.body = "todo page";
});

let page = new Router();
page.get("/chris", async ctx => {
    ctx.body = "hello chris";
}).get("/todo", ctx => {
    ctx.body = "todo page";
});

//装载所有子路由
router.use("/home", home.routes()).use(home.allowedMethods());
router.use("/page", page.routes()).use(page.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log("[SERVER] started at port 3000");
})