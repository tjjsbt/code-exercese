const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();

app.use(bodyParser());


app.use(async ctx => {
    if(ctx.url === "/" && ctx.method === "GET"){
        let html = `
            <h1>bodyparser demo</h1>
            <form method="POST" action="/">
                <p>username</P>
                <input name="username" /><br>
                <p>age</P>
                <input name="age" /><br>
                <p>site</P>
                <input name="site" /><br>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    }else if(ctx.url === "/" && ctx.method === "POST"){
        let postdata = ctx.request.body;
        ctx.body = postdata;
    }else{
        ctx.body = "<h1>404</h1>";
    }
});


app.listen(3000, () => {
    console.log("[SERVER] is starting at port 3000");
})