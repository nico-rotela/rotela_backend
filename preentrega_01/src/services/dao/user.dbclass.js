// import userModel from "../../dao/models/userSchema.js"
// import { cartModel } from "../../services/models/cartsSchema.js";
// import { createHash, isValidPassword } from '../../utils.js'


// export default class userService {

//     save = async (req, res) => {
//         try {
//             const { first_name, last_name, email, age, password } = req.body;
               
//             const carrito = await cartModel.create({
//                             name: "cart",
//                             products: []
//                         })
//                         const verify = await userModel.findOne({email: email})
//                         if(!verify){
//                             userModel.create({first_name: first_name, last_name:last_name, email: email, age: age, password: createHash(password), carrito: carrito})
//                             res.send("akajkd")
//                         }else{
//                             res.send("El usuario ya existe Por favor intente con otro nombre de usuario")
//                         }
//                     } catch (error) {
//                         console.log(error)
//                     }
//                 }

        // addUser = async (req, res) => {
        //     try{
        //         const first_name = req.body.name
        //         const last_name = req.body.apellido
        //         const email = req.body.user
        //         const age = req.body.age
        //         const password = req.body.password
        //         let passHash = await bcrypt.hash(pass, 8)
        //         const rol = await rolModel.findOne({name: "Usuario"})
        //         const cart = await cartModel.create({
        //             name: "cart",
        //             products: []
        //         })
        //         const verify = await userModel.findOne({user: user})
        //         if(!verify){
        //             userModel.create({name: name, apellido: apellido, user: user, pass: passHash, rol: rol, cart: cart})
        //             res.redirect('/')
        //         }else{
        //             res.send(El usuario ya existe Por favor intente con otro nombre de usuario)
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        
        
// }