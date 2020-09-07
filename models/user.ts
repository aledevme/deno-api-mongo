import db from '../db/mongo.ts';
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

interface User {
    email : string;
    password : string;
}

class UserClass {
    constructor(){};

    userCollection = db.collection('users');

    validate = (userData : User) => {
        try {
            
            const email = userData.email;
            const password = userData.password;
            
            if(email && password){
                return userData;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    register = async (userData : User) => {
        const {email, password} = userData;

        console.log(password);

        const hashPassword = await bcrypt.hashSync(password);

        const registerUser = await this.userCollection.insertOne({
            email : email,
            password : hashPassword
        });

        return registerUser;
    }

    findUser = async (email : any) => {
        const findUser = this.userCollection.findOne({
            email : email
        });
        return findUser;
    }

    login = async (password:any , userData: any) => {

        const map = new Map(Object.entries(userData));
        const checkPassword = await this.verifyPassword(password, map.get('password'));
        
        if (checkPassword) {
            return userData;
        } else {
            return null;
        }

    }

    verifyPassword = async (userPassword: any, dbPassword: any) => {
        const result = await bcrypt.compareSync(userPassword, dbPassword);
        return result;
    }
}

export default UserClass