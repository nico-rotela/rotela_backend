import { Router } from "express";
// import cartManager from '../service/cartManager.js'
import { cartModel } from "../dao/models/cartsSchema.js";

const router = Router()

router.get('/', async (req, res) => {
    try {
        let cart = await cartModel.find()
        console.log(cart);
        res.send(cart)
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})

// crear carrito
router.post('/', async (req, res) => {
    try {
        let {nombre} = req.body
        let cart = await cartModel.create({nombre})
        res.send(cart)
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})



// -----------------------------
// no supe hacer la relacion para pushear un producto dentro del carrito sin harcodearlo
// -----------------------





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