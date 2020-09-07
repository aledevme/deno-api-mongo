import { Context } from 'https://deno.land/x/oak/mod.ts'

import User from '../models/user.ts';

import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";

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
            
            const signUp = await user.register(userData);
            
            if (signUp) {
                response.status = 200;
        
                response.body = {
                    success: true,
                    data: 'user has been created',
                    user: signUp
                };
            } else {
                response.status = 500;
        
                response.body = {
                    success: false,
                    data: 'user has not been created',
                };
            }


        } else{
            response.status = 400;
        
            response.body = {
                success: false,
                data: 'user not been defined',
            };
        }
    }
}

const login = async ({request, response}: Context) => {
    
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

            const findUser = await user.findUser(email);
            
            if (findUser) {
                
                const logIn = await user.login(password, findUser);
            
                if (logIn) {

                    const {DENO_JWT_KEY} = config();

                    const map = new Map(Object.entries(userData));

                    const payload : Payload = {
                        iss : `${map.get('email')} ${map.get('password')}`,
                        exp : setExpiration(60*60)
                    };
        
                    const header: Jose = {
                        alg : 'HS256',
                        typ : 'JWT'
                    };
        
                    const token = await makeJwt({
                        header,
                        payload, 
                        key : DENO_JWT_KEY
                    })

                    console.log(token);
        
                    response.status = 200;
                    response.body = {
                        success: true,
                        user: findUser,
                        token: token
                    };
                } else {
                    response.status = 404;
                    response.body = {
                        success: false,
                        data: 'Unable to logged in',
                    };
                }

            } else {
                response.status = 404;
                response.body = {
                    success: false,
                    data: 'User dont exist',
                };
            }

            
        } else {
            response.status = 400;
        
            response.body = {
                success: false,
                data: 'user not been defined',
            };
        }
    }
}

export {
    register,
    login
}