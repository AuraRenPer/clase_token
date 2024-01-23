//Cargar variables de entorno
import * as dotenv from "dotenv";
dotenv.config();
import { getCredentials, getToken } from "./utils/headers.js";
import { signToken, verifyToken, validateExpiration } from "./utils/token.js";
import { getUser } from "./utils/users.js";

//Importar los modulos de express
import express from "express";

//Inicializar express
const app = express();

//Declaramos el puerto
const PORT = process.env.PORT || 3000;

//Crear las rutas necesarias para el ejemplo
app.get('/public',(req, res) =>{
    res.send("Soy una ruta publica");
});
app.get('/private',(req, res) =>{
    try {
        const token = getToken(req);
        const payload = verifyToken(token);

        validateExpiration(payload);
 
        res.send("Soy un EndPoint privado");
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
 
});
app.post("/token", (req, res) => {
    try {
        const { username, password } = getCredentials(req);
        const user = getUser(username, password);
        const token = signToken(user);
        res.send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
   

//Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});