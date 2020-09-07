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

import validateJwtToken from './middlewares/jwtMiddleware.ts';

//declarating routes of our API
router
    .get("/brands", getBrands)
    .post("/brand", validateJwtToken ,createBrand)
    .get("/brands/:id", getBrand)
    .post("/brand/product/add", validateJwtToken ,addProductToBrand)
    .put("/brand/:id", validateJwtToken ,updateBrand)
    .delete("/brands/:id", validateJwtToken ,deleteBrand)

export default router;