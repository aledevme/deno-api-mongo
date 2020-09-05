import { Application } from "https://deno.land/x/oak/mod.ts";//import routes from "./routes/routes.ts";
import brand from "./routes/brand.ts";
import auth from "./routes/auth.ts";

const port = 5000;
const app = new Application();

app.use(auth.routes());
app.use(auth.allowedMethods());

app.use(brand.routes());
app.use(brand.allowedMethods());
console.log('running on port ', port);

await app.listen({port});
