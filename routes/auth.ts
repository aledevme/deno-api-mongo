import { Router } from "https://deno.land/x/oak/mod.ts";
//instance of router
const router = new Router();

import { 
    register,
    login
} from "../controllers/authController.ts";

router
    .post('/register', register)
    .post('/login', login)

export default router