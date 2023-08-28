import { Router } from "express";
import { addProduct, deleteProduct, prueba } from "../controllers/products.controler.js";
import { passportCall } from "../utils.js";
// import productManager from "../service/productManager.js"
// import {ProductModel} from '../dao/models/productsSchema.js'

const router = Router()
// configurar route para poder usarla si se es administrador solamente


// cargar producto
router.post('/',passportCall('jwt'), addProduct)
router.post('/delete/id', deleteProduct, (req, res)=>{
    const user = req.user
    res.send({user: user})
})
   












// ---------------------      fileSystem      ----------------------------

//  FS

// instancio la class de productos
// const productosManager = new productManager('/jsonProductos.json')

// traer todos los productos o los que se pida(limit)
// router.get('/' , async (req,res) => {
//     const productos = await productosManager.getProduct()
//     const { limit } = req.query;
//     res.json(limit ? productos.slice(0, parseInt(limit)) : productos) 
// })


// crear un objeto nuevo
// router.post('/', async (req, res) => {
//     const prod = req.body
//     await productosManager.addProduct(prod.titulo, prod.descripcion, prod.precio, prod.img, prod.code, prod.stock)
//     res.send({ status: 'succes'})
// })


// borrar un producto
// router.delete('/delete/:pid', async (req,res) => {
//     const prodId = parseInt(req.params.pid)
//     await productosManager.deleteProductById(prodId)
//     res.send({ status: 'succes', mensage: 'usuario eliminado'})

// })



export default router