//import context from oak
import { Context } from 'https://deno.land/x/oak/mod.ts';
//import user class
import User from '../models/user.ts';
//import utils by djwt
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
//import config to read .env
import { config } from "https://deno.land/x/dotenv/mod.ts";

const user = new User;

const register = async ({request, response}: Context) => {
    //verify if request has body 
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
        //validate interface
        if (user.validate(userData)) {
            //register user
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
    //verify if request has body 
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
        //validate interface
        if (user.validate(userData)) {
            //find the user by email
            const findUser = await user.findUser(email);
            
            if (findUser) {
                //login
                const logIn = await user.login(password, findUser);
            
                if (logIn) {
                    //get .env variable key 
                    const {DENO_JWT_KEY} = config();
                    //map the user data
                    const map = new Map(Object.entries(userData));
                    //create a payload and set the expiration of an hour
                    const payload : Payload = {
                        iss : `${map.get('email')} ${map.get('password')}`,
                        exp : setExpiration(60*60)
                    };
                    //create a Jwt Header
                    const header: Jose = {
                        alg : 'HS256',
                        typ : 'JWT'
                    };
                    //create the token
                    const token = await makeJwt({
                        header,
                        payload, 
                        key : DENO_JWT_KEY
                    })
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