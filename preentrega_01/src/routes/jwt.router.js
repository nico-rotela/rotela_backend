import { Router } from 'express';
import userModel from '../services/models/userSchema.js'
import {isValidPassword} from '../utils.js';
import { generateJWToken } from '../utils.js';

const router = Router();

router.post("/login", async (req, res)=>{
   const {email, password} = req.body
   try {
    const user = await userModel.findOne({email: email});

    if(!user){
        req.logger.warning("el usuario no existe")
        return res.status(204).send({error: "Not found", message: "Usuario no encontrado con username: " + email}); 
    }

    if(!isValidPassword){
        req.logger.warning("contraseña incorrecta intentelo nuevamente")
        return res.status(401).send({status:"error",error:"El usuario y la contraseña no coinciden!"}); 
    }

    const tokenUser = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role,
        carritos: user.carritos
    }

    const access_token = generateJWToken(tokenUser);


    // Con Cookies (la cookie va a guardar el token)
    res.cookie('jwtCookieToken', access_token , {
        maxAge: 60000,
        // httpOnly: false // expone la cookie
        httpOnly: true // No expone la cookie
    })

    // res.send({message: "login successful!!", jwt: access_token })
    res.send({message: "Login successful!"});
    
   } catch (error) {
    console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
   }
    
});

export default router;