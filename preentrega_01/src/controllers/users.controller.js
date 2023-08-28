import userModel from "../services/models/userSchema.js";
import UserService from "../services/dao/user.dbclass.js";
import { createHash, isValidPassword } from "../utils.js";
import { cartModel } from "../services/models/cartsSchema.js";
import { generateJWToken } from "../utils.js";

const userService = new UserService

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers()
        res.render('allUser', {users: users})
    } catch (error) {
        res.status(400).send("no tienens autorizacion para ver los usuarios")
    }
}


export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        if(!first_name || !last_name || !email || !age || !password) return res.status(400).send({status: "error", error: "campos incompletos"})
        // creo el carrito del usuario
        const carritos = await cartModel.create({nombre: "carritos", products: []})
        const exists = await userModel.findOne({ email });
        if(exists) return res.status(400).send({status: "error", error: "el usuario ya esta regitrado"})
        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            carritos: carritos
        };
        const result = await userModel.create(user);
        res.status(200).send({status: "succes"})
    } catch (error) {
        res.status(400).send({status: error, message: "error registrando usuario"})
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send({status: "error", error: "campos de validacion incompletos"})
    const user = await userModel.findOne({email: email});
    if(!user) return res.status(200).send({error: "error", message: "usuario no encontrado para iniciar su secion"})
    const validPassword = await isValidPassword(user, password)
    if(!validPassword) res.status(400).send({status: error, error: "password incorrecto"})
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
        maxAge: 600000,
        httpOnly: true // No expone la cookie
    })
    res.send({message: "Login successful!"});
}

// export const asignarRol = async (req, res) => {
//     try {
//         const {role} = req.body
//         let id = req.params.id
//         let user = await userModel.findById(id)
//         console.log(user.role);
//         await userModel.updateOne({_id: user}, {$set : {role: role}})
        
//     } catch (error) {
//         res.status(400).send("no se pudo actualizar el rol de este usuario")
//     }
// }

export const newRol = async (req, res) => {
    try {
        const id = req.body.id
        const user = await userModel.findById(id)
        console.log(user);
        if(user.role === "user"){
            console.log("entre en el if user");
            const role = "userPremiun"
            await userModel.updateOne({_id: user}, {$set: {role: role}})
            res.status(200).send("nuevo rol de usuario: userPremiun")
        }
        if(user.role === "userPremiun"){
            console.log("estoy en el if premiun");
            const role = "user"
            await userModel.updateOne({_id: user}, {$set: {role: role}})
            res.status(200).send("nuevo rol de usuario: user")
        }
        if(user.role === "admin"){
            res.status(400).send("no se puede cambiar el rol al admin")
        }
    } catch (error) {
        res.status(500).send({error: "No se pudo asignar el rol nuevo", message: error})
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const id = req.body.id
        const idUser = await userModel.findById(id)
        await userService.deleteUser(idUser)
        res.status(200).send("ussuario eliminado")
    } catch (error) {
        res.status(500).send("no se pudo eliminar el usuario" + error)
    }
}