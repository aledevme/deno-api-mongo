import { Context } from 'https://deno.land/x/oak/mod.ts';

import { validateJwt } from "https://deno.land/x/djwt/validate.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";

const validateJwtToken = async ({request, response}: Context, next: any) => {

    const {DENO_JWT_KEY} = config();

    console.log(request.headers);

    const jwtToken = request.headers.get('Authorization') ? request.headers.get('Authorization')! : '';

    var jwtData = jwtToken.split(" ", 2); 

    const { isValid } = await validateJwt({
        jwt : jwtData[1],
        key : DENO_JWT_KEY,
        algorithm: "HS256",
    })

    if (!isValid) {
        response.status = 401;
        response.body = {
            message : 'Not Authorized'
        };

        return;
    } else {
        await next();
    }
}

export default validateJwtToken