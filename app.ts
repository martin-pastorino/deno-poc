import { Hono } from "https://deno.land/x/hono@v3.11.12/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.11.12/middleware.ts";
import { streamSSE } from "https://deno.land/x/hono@v3.11.12/helper/streaming/index.ts";

const app = new Hono();
let id = 0;

app.get("/", serveStatic({ path: "./index.html" }));

app.get("/counter",(c) => {
    return streamSSE(c, async (stream)=> {
        while(true) {
            const message = `Son las ${new Date().toLocaleTimeString()}`
        await stream.writeSSE({id: String(id++), data: message, event: "update"});
        await stream.sleep(5000);
        }
    })
})

Deno.serve(app.fetch);
