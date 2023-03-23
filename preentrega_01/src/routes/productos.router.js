import { Router } from "express";
import productManager from "../service/productManager.js"

const router = Router()
// instancio la class de productos
const productosManager = new productManager('/jsonProductos.json')

// traer todos los productos o los que se pida(limit)
router.get('/' , async (req,res) => {
    const productos = await productosManager.getProduct()
    const { limit } = req.query;
    res.json(limit ? productos.slice(0, parseInt(limit)) : productos) 
})

// traer los productos filtrados por id
router.get('/:productosId', async (req, res) => {
    const prodId = await productosManager.getProductById(parseInt(req.params.productosId))
    res.send(prodId)
})

// crear un objeto nuevo
router.post('/', async (req, res) => {
    const prod = req.body
    await productosManager.addProduct(prod.titulo, prod.descripcion, prod.precio, prod.img, prod.code, prod.stock)
    res.send({ status: 'succes'})
})

// modificar un producto


// borrar un producto
router.delete('/delete/:pid', async (req,res) => {
    const prodId = parseInt(req.params.pid)
    await productosManager.deleteProductById(prodId)
    res.send({ status: 'succes', mensage: 'usuario eliminado'})

})

export default router