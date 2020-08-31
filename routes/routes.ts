//import router from deno package
import { Router } from "https://deno.land/x/oak/mod.ts";
//import actions from a controller
import { getBrands, createBrand, addProductToBrand } from "../controllers/rest.ts";

//instance of a router
const router = new Router();

//declarating routes of our API
router
    .get("/brands", getBrands)
    .post("/brand", createBrand)
    .post("/brand/product/add", addProductToBrand)

export default router;