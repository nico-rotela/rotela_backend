import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// genero el hash en los pasword
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// validamos la contraseña con la que esta en la DB como hash
export const isValidPassword = (user, password )=>{
    return bcrypt.compareSync(password, user.password)
}

 
//  JWT (JSON WEB TOKEN)
export const PRIVATE_KEY = "nicorotelasecretkey";

/**
 * Metodo que autentica el token JWT para nuestros requests.
 * OJO: Esto actúa como un middleware, observar el next.
 * @param {*} req Objeto de request
 * @param {*} res Objeto de response
 * @param {*} next Pasar al siguiente evento.
 */

// el jwt se guarda en los headers de autorizacion
export const generateJWToken = (user)=>{
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
}

export const authToken = (req, res, next) => {
    //  El JWT se guarda en los headers de auth
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:");
    console.log(authHeader);

    if(!authHeader){
        return res.status(401).send({error: "User not authenticated or missing token."});
    }

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        if (error) return res.status(403).send({error: "Token invalid, Unauthorized!"});
        //Token OK
        req.user = credentials.user;
        console.log(req.user);
        next();
    })
}

// para manejo de errores
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log("Entrando a llamar strategy: ");
        console.log(strategy);
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({error: info.messages?info.messages:info.toString()});
            }
            console.log("Usuario obtenido del strategy: ");
            console.log(user);
            req.user = user;
            next();
        })(req, res, next);
    }
};


// para manejo de Auth
export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT"); 
        if (req.user.role !== role) {
            return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol."); 
        }
        next();
    }
};

export const restringirUser = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT"); 
        if (req.user.role === role ) {return res.status(200).send("este usuario no tiene acceso a esta funcion")}
        next()
    }
}

export default __dirname;