import { Router } from "express";
// import cartManager from '../service/cartManager.js'
import { cartModel } from "../dao/models/cartsSchema.js";
import { ProductModel } from "../dao/models/productsSchema.js";
import productManager from "../service/productManager.js";

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

// agregar un producto 
router.post('/cid/producto/pid', async (req, res) => {
    const {cid, pid} = req.body

    let cart = await cartModel.findById(cid)
    console.log(cart);
    let product = await ProductModel.findById(pid)
    console.log(product);

    cart.producto.push({prods: product})

    let result = await cartModel.updateOne(cart)
    console.log('resultado del carrito');
    console.log(cart);

    res.send(result)
})

// borrar un producto de un carrito
router.delete('/cid/productoDelete/pid', async (req, res) => {
    const {cid, pid} = req.body

    let cart = await cartModel.findById(cid)
    console.log(cart.producto);
   
    let itemRemove = await cart.producto.find(prod => prod.prods == pid)
    console.log(itemRemove);

    await cart.producto.pull(itemRemove)
    await cart.save()

    res.send(cart)
})

// modificar producto de carrito
router.put('/:cid/producto/:pid', async(res,req) => {

    const {prods, quantity} = req.body
    
    let cart = await cartModel.findById(cid)
    console.log(cart.producto);



    await cart.producto.updateOne({"_id": cid},
                            {$addToSet:{
                            "producto":
                            {$each:[{"prods": prods,"quantity": quantity}]}
                            }}
    )
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

// await carrito.updateOne({ _id: ObjectId(_id) }, { $set: {hora:hora,email:email,direccion:direccion} })



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