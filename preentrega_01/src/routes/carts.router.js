import { Router } from "express";
import cartManager from "../service/cartManager.js";

const router = Router()
const cartmanager = new cartManager('/jsonCarrito.json')

// ruta raiz POST
router.post('/', async (req, res) => {
    const carrito = await cartmanager.addCart({producto:'[]', prodId})
    res.send(carrito)
})

router.get('/', async (req, res) => {
    const cartProd = await cartmanager.getProduct()
    res.send(cartProd)

})

export default router