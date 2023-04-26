import { Router } from "express";
// import cartManager from '../service/cartManager.js'
import { cartModel } from "../dao/models/cartsSchema.js";
import { ProductModel } from "../dao/models/productsSchema.js";

const router = Router()

// traer todos los carritos con sus productos
router.get('/', async (req, res) => {
    try {
        let cart = await cartModel.find()
        res.send(cart)
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})

// agregar un producto con populate
router.post('/:cid/producto/:pid', async (req, res) => {
    // capturo carrito id
    let cid = req.params.cid
    // capturo producto id
    let pid = req.params.pid

    let cartPopu = await cartModel.findOne({_id: cid}).populate('producto')
    
    console.log('este es el cartppopu');
    console.log(cartPopu);

    let carrito = await cartModel.findOne({_id: cid})
    carrito.producto.push({prods: pid})
    console.log(carrito);

    let result = await cartModel.updateOne({_id: cid}, carrito)
    res.send(result)
    console.log(result);
    // falta un condicional de quantity(borrar hardcoder de app.js)
})

// borrar un producto de un carrito
router.delete('/:cid/productoDelete/:pid', async (req, res) => {
    // capturo carrito id
    let cid = req.params.cid
    // capturo producto id
    let pid = req.params.pid

    let carrito = await cartModel.findOne({_id: cid})

    let cart = carrito.producto.filter(item => item._id !== pid)

    let result = await cartModel.deleteOne({_id: cid}, cart)

    res.send(result)
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