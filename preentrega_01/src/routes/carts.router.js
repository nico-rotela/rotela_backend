import { Router } from "express";
// import cartManager from '../service/cartManager.js'
// import productManager from "../service/productManager.js";
import { cartModel } from "../dao/models/cartsSchema.js";
import { ProductModel } from "../dao/models/productsSchema.js";

const router = Router()

// traer todos los carritos con sus productos
router.get('/', async (req, res) => {
    try {
        let cart = await cartModel.find().populate('producto.prods')
        console.log('estoy en el get!!');
        console.log(JSON.stringify(cart, null, '\t'));
        res.send(cart)
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})

// agregar un producto 
router.post('/cid/producto/pid', async (req, res) => {
    try {
        const {cid, pid} = req.body

        let cart = await cartModel.findById(cid).populate('producto')
        console.log(cart);
        let product = await ProductModel.findById(pid)
        console.log(product);

        let validarProd = cart.producto.find(prod => prod.prods == pid)

        if (validarProd) {
            validarProd.quantity += 1
        }else{
            cart.producto.push({prods: product})
            console.log(JSON.stringify(cart, null, '\t'));
        }


        let result = await cartModel.updateOne(cart)
        console.log('resultado del carrito');
        console.log(JSON.stringify(cart, null, '\t'));

        res.send(result)
        
    } catch (error) {
        console.error("No se pudo agregar producto al carrito " + error);
        res.status(500).send({error: "No se pudo agregar producto al carrito", message: error});
    }
    
})

// borrar un producto de un carrito
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

// vaciar carrito
router.post('/vaciarCarrito', async (req, res) => {
    const {cid} = req.body
    let cart = await cartModel.findById(cid)
    
    if(cart){
        cart.producto = []
        await cart.save()
    }
    console.log('se vacio el carrito');
    res.send(cart)
})


// modificar producto de carrito
router.put('/:cid/producto/:pid', async(res,req) => {
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