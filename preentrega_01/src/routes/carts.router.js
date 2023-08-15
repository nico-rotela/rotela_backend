import { Router } from "express";
import { cartModel } from "../services/models/cartsSchema.js";
import {getCarts, pushProducts, vaciarCarrito, terminarCompra} from '../controllers/carts.cotroller.js'
import { authorization, passportCall } from "../utils.js";

const router = Router()


// traer todos los carritos con sus productos
router.get('/',passportCall('jwt'),authorization("admin"),getCarts)

// agregar un producto 
router.post('/agregar', passportCall('jwt'), pushProducts)

// vaciar carrito
router.post('/vaciarCarrito',passportCall('jwt'), vaciarCarrito)

// terminar compra de carrito
router.post('/comprar', passportCall('jwt'), terminarCompra)

// borrar un producto de un carrito
// router.delete('/:cid/productoDelete/:pid', deleteProdInCart) falta aplicar logica de borrar

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

export default router