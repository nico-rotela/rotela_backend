// import cartManager from '../service/cartManager.js'
// import productManager from "../service/productManager.js";
// import { ProductModel } from "../dao/models/productsSchema.js";
import { Router } from "express";
import { cartModel } from "../services/models/cartsSchema.js";
import {getCarts, pushProducts, vaciarCarrito, crearCart} from '../controllers/carts.cotroller.js'
import { authorization, passportCall } from "../utils.js";


const router = Router()

// crear carrito
router.get('/',  passportCall('jwt'), crearCart )
    

// traer todos los carritos con sus productos
router.get('/',
    passportCall('jwt'), //-> Usando JWT por Cookie usando customCall
    authorization("admin"),
    getCarts)

// agregar un producto 
router.post('/agregar', passportCall('jwt'), pushProducts)

// vaciar carrito
router.post('/vaciarCarrito', vaciarCarrito)



// borrar un producto de un carrito
// router.delete('/:cid/productoDelete/:pid', deleteProdInCart) falta aplicar logica de borrar

router.delete('/cid/productoDelete/pid', async (req, res) => {

    try {
        const {cid, pid} = req.body

    let cart = await cartModel.findById(cid).populate('producto')
    console.log(cart.producto);
   
    let itemRemove = await cart.producto.find(prod => prod.prods == pid)
    console.log(itemRemove);

    await cart.producto.pull(itemRemove)
    await cart.save()

    res.send(cart)
    } catch (error) {
        console.error("No se pudo borrar el producto deseado " + error);
        res.status(500).send({error: "No se pudo borrar el producto", message: error});
    }

    
})










// FS

// const cartmanager = new cartManager('/jsonCarrito.json')

// ruta raiz POST, crea un carrito al ejecutarlo
// router.post('/', async (req,res) => {
//     const cart = await cartmanager.addCart()
//     res.send(cart)
// })

// traer carrito por id
// router.get('/:cid', async (req, res) => {
//     const carId = await cartmanager.getCarrito(parseInt(req.params.cid))
//     res.send(carId)
// })

// pushear producto al carrito 
// router.post('/:cid/product/:pid', async (req, res) => {
//     const cid = parseInt(req.params.cid)
//     const product = req.body;
//     await cartmanager.addProduct(cid, product.carrito)
//     res.status(201).send({mensaje: "producto agregado"})
// })


export default router