//Cargar variables de entorno

import * as dotenv from "dotenv";
dotenv.config();

const users = [
    {
        id: process.env.USERNAME,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        fullname: process.env.FULLNAME,
    },
];


export const getUser = ({USERNAME, PASSWORD}) => {
    const user = users.find((user) => user.USERNAME === USERNAME);
    if(!user || user.PASSWORD !== PASSWORD){
        throw new Error('Credenciales invalidas');
    }
    return user;
}

//crear funcion para verificar token

export const verifytoken = (token) =>{
    return jwt.verify(token, SECRET);
}

//funcion para verificar la expiracion de token
export const validateExpiration = (payload) =>{
    if(Date.now() > payload.exp){
        throw new Error('El token ha expirado');
    }
}