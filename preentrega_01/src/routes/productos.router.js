import { Router } from "express";
// import productManager from "../service/productManager.js"
import {ProductModel} from '../dao/models/productsSchema.js'

const router = Router()

// mostrar productos

router.get('/', async (req,res) => {
    try {
        let products = await ProductModel.find()
        console.log(products);
        res.send(products)
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})


// traer los productos filtrados por id
router.get('/:productosId', async (req, res) => {
    const prodId = await productosManager.getProductById(parseInt(req.params.productosId))
    res.send(prodId)
})


// cargar producto
router.post('/', async (req, res) => {
    try {
        let {titulo, precio, stock} = req.body
        let product = await ProductModel.create({titulo, precio, stock})
        res.send(product)
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})


// modificar un producto
router.put('/put', async (req, res) => {
    
})


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