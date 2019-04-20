const Koa = require("koa");
const app = new Koa();
app.use(async ctx => {
    if(ctx.url === "/" && ctx.method === "GET"){
        let html = `
            <h1>koa post demo</h1>
            <form method="POST" action="/">
                <p>username</p>
                <input name="username" /><br>
                <p>age</p>
                <input name="age" /><br>
                <p>site</p>
                <input name="site" /><br>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    }else if(ctx.url === "/" && ctx.method === "POST"){
        ctx.body = await parseData(ctx);
    }else{
        ctx.body = "<h1>404</h1>"
    }
});

function parseData(ctx) {
    return new Promise((resolve, reject) => {
        let querydata = "";
        try {
            ctx.req.on("data", data => {
                querydata += data;
            });
            ctx.req.addListener("end", () => {                
                let json = parseQuerystrToJson(querydata);
                console.log(json);
                resolve(json);
            })
        } catch (error) {
            reject(error);
        }
    })
}

function parseQuerystrToJson(querystr){
    let jsondata = {};
    let querylist = querystr.split("&");
    // console.log(querylist);
    for(let [index, querystr] of querylist.entries()){
        let itemlist = querystr.split("=");
        // console.log(itemlist);
        jsondata[itemlist[0]] = decodeURIComponent(itemlist[1]);
    }
    return jsondata;
}

app.listen(3000, () => {
    console.log("[SERVER] is starting at port 3000");
})