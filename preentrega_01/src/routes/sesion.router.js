import { Router } from "express";
import userModel from "../dao/models/userSchema.js";

const router = Router()

// register
router.post('/register', async (req,res) => {
    const { first_name, last_name, email, age, password} = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    const exists = await userModel.findOne({email})

    if(exists){
        return res.status(400).send({status: "error", msg: "usuario ya existe"})
    }

    const user = {
        first_name,
        last_name,
        email,
        age,
        password,
    };

    const result = await userModel.create(user);
    res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});

})


// login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email,password}); //Ya que el password no está hasheado, podemos buscarlo directamente
    
    if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});

    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });

})

// destruir la session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error){
            res.json({error: 'error de logout', msg: 'error al cerrar session'})
        }
        res.render('logout')
    })
})


export default router










