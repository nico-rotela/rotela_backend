
import { Router } from 'express'
import productManager from '../service/productManager.js'

const router = Router()

const productosManager = new productManager('/jsonProductos.json')

router.get('/', async (req, res) => {
    let prodRender = await productosManager.getProduct()
    
    res.render('realTimeProducts', {prodRender})
})

export default router