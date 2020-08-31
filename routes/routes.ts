import { Router } from "https://deno.land/x/oak/mod.ts";
import { getBrands, createBrand } from "../controllers/rest.ts";

const router = new Router();

router
    .get("/brands", getBrands)
    .post("/brand", createBrand)

export default router;
