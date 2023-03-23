import { Router } from "express";
import cartManager from '../service/cartManager.js'

const router = Router()
const cartmanager = new cartManager('/jsonCarrito.json')

// ruta raiz POST, crea un carrito al ejecutarlo
router.post('/', async (req,res) => {
    const cart = await cartmanager.addCart()
    res.send(cart)
})

// traer carrito por id
router.get('/:cid', async (req, res) => {
    const carId = await cartmanager.getCarrito(parseInt(req.params.cid))
    res.send(carId)
})

// pushear producto al carrito 
router.post('/:cid/product'), async (req, res) => {
    const cid = parseInt(req.params.cid)
    await cartmanager.addProduct(cid, producto)
    res.send({succes})
}


export default router