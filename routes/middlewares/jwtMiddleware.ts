import { Context } from 'https://deno.land/x/oak/mod.ts';
//import utils by djwt
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
//import config to read the .env
import { config } from "https://deno.land/x/dotenv/mod.ts";

const validateJwtToken = async ({request, response}: Context, next: any) => {
    //get the .env jwt key
    const {DENO_JWT_KEY} = config();

    //get the Authorization request
    const jwtToken = request.headers.get('Authorization') ? request.headers.get('Authorization')! : '';

    //separate the autorization ex: Bearer token -> ['Bearer', 'token']
    var jwtData = jwtToken.split(" ", 2); 

    //validate the token
    const { isValid } = await validateJwt({
        jwt : jwtData[1],
        key : DENO_JWT_KEY,
        algorithm: "HS256",
    })

    //verify if is a valid token by the payload
    if (!isValid) {
        response.status = 401;
        response.body = {
            message : 'Not Authorized or not valid token provided'
        };

        return;
    } else {
        await next();
    }
}

export default validateJwtToken