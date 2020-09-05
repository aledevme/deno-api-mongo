//import router base
import { Router } from "https://deno.land/x/oak/mod.ts";
//instance of router
const router = new Router();
//import actions from a controller
import { 
    getBrands, 
    createBrand, 
    addProductToBrand, 
    getBrand, 
    updateBrand,
    deleteBrand
} from "../controllers/BrandController.ts";

//declarating routes of our API
router
    .get("/brands", getBrands)
    .post("/brand", createBrand)
    .get("/brands/:id", getBrand)
    .post("/brand/product/add", addProductToBrand)
    .put("/brand/:id", updateBrand)
    .delete("/brands/:id", deleteBrand)

export default router;