import { Context } from 'https://deno.land/x/oak/mod.ts'

import User from '../models/user.ts';

const user = new User;

const register = async ({request, response}: Context) => {
    

    if (!request.hasBody) {
        response.status = 404;
      
        response.body = {
          success: false,
          data: "No data provided",
        };
    } else {
        const { email, password } = await request.body().value;

        let userData = {
            email: email, 
            password: password
        };
        
        if (user.validate(userData)) {
            
            const signUp = user.register(userData);
            
            if (signUp) {
                response.status = 200;
        
                response.body = {
                    success: true,
                    data: 'user has been created',
                };
            } else {
                response.status = 500;
        
                response.body = {
                    success: true,
                    data: 'user has not been created',
                };
            }


        } else{
            response.status = 400;
        
            response.body = {
                success: true,
                data: 'user not been defined',
            };
        }
    }
}

export {
    register
}