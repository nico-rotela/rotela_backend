import CartService from "../services/dao/carts.dao.js";
import { ProductModel } from "../services/models/productsSchema.js";
import { cartModel } from "../services/models/cartsSchema.js";
import mongoose from "mongoose";
import TicketService from "../services/dao/ticket.dao.js";

const cartService = new CartService
const tickerService = new TicketService


export const getCartbyId = async(req, res) => {
    try {
        const cid = req.user.carritos[0]

        let cart = await cartService.getCid(cid)
        res.render("cart", {cart})
    } catch (error) {
        req.logger.error("Hubo un problema conectandose a la persistencia de los carritos."  + error)
        res.status(500).send({ error: error });
    }
}

export const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getAll()
        res.send(carts)
    } catch (error) {
        req.logger.error("Hubo un problema conectandose a la persistencia de los carritos."  + error)
        res.status(500).send({ error: error });
    }
}
//         boton(idddd)
export const pushProducts = async (req, res) => {
    try {
        // obtener user
        
        const cid = req.user.carritos[0]
        
        const pid = req.body
        const cart = await cartModel.findOne({'_id': new mongoose.Types.ObjectId(cid)})
        // busco el carrito y el producto con sus id's
        const product = await ProductModel.findById(pid.id)

        const validation = cart.producto.find(prod => prod.prods._id == pid.id)

        if(validation){
            validation.quantity++
        }else{
            cart.producto.push({prods: product})
        }
        
        const result = await cartModel.findOneAndUpdate({_id: cid}, {$set: cart}, {new: true})

        res.send('producto pusheado')
    } catch (error) {
        req.logger.warning("No se pudo agregar producto al carrito " + error)
        res.status(500).send({error: "No se pudo agregar producto al carrito", message: error});
    }

    
}

export const vaciarCarrito = async (req, res) => {
    try {
        const cid = req.user.carritos[0]
        let cart = await cartService.getCid(cid)

        if (cart) {
            cart.producto = []
            await cart.save()
        }
        res.send('carrito vaciado')
    } catch (error) {
        req.logger.warning("No se pudo vaciar el carrito " + error)
        res.status(500).send({error: "No se pudo vaciar el carrito", message: error});
    }
}

export const terminarCompra = async(req, res) => {
    try {
        const cid = req.user.carritos[0]
        // carrito (cid)
        let cart = await cartService.getCid(cid)

        // suma total de los productos en el carrito
        const total = cart.producto.reduce((resultado , cantidad) => {
            return (resultado + cantidad.prods.precio);
        }, 0 )
        console.log(total);
        
        // usuario del carrito
        const usuario = req.user.email
        
        const ticket = {usuario, total}
        const pusTicket = await tickerService.crearTicket(ticket)

        if(pusTicket){
            cart.producto = []
            await cart.save()
        }
        res.send(pusTicket)
    } catch (error) {
        req.logger.warning("No se pudo realizar la compra " + error);
        res.status(500).send({error: "No se pudo realizar la compra", message: error});
    }
}

