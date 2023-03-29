import { Router } from "express";
import productManager from "../service/productManager.js"

const router = Router()
// instancio la class de productos
const productosManager = new productManager('/jsonProductos.json')

router.get('/', async (req, res) => {
    let prodRender = await productosManager.getProduct()
    
    res.render('home', {prodRender})
})



export default router