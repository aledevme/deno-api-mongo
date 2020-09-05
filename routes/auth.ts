import { Router } from "https://deno.land/x/oak/mod.ts";
//instance of router
const router = new Router();

import { 
    register
} from "../controllers/authController.ts";

router
    .post('/register', register)

export default router