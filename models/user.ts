import db from '../db/mongo.ts';

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
        const email = userData.email;
        const password = userData.password;

        const registerUser = await this.userCollection.insertOne({
            email : email,
            password : password
        });

        console.log(registerUser);

        return registerUser;
    }
}

export default UserClass