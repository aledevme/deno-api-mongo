//import router from deno package
import { Router } from "https://deno.land/x/oak/mod.ts";
//import actions from a controller
import { 
    getBrands, 
    createBrand, 
    addProductToBrand, 
    getBrand, 
    updateBrand,
    deleteBrand
} from "../controllers/rest.ts";


//instance of router
const router = new Router();

//declarating routes of our API
router
    .get("/brands", getBrands)
    .post("/brand", createBrand)
    .get("/brands/:id", getBrand)
    .post("/brand/product/add", addProductToBrand)
    .put("/brand/:id", updateBrand)
    .delete("/brands/:id", deleteBrand)

export default router;