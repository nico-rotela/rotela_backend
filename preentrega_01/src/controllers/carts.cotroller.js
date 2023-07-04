// import { response } from "express";
import CartService from "../services/dao/carts.dao.js";
import { ProductModel } from "../services/models/productsSchema.js";
// import { passportCall } from "../utils.js";
import { cartModel } from "../services/models/cartsSchema.js";
import mongoose from "mongoose";
import ticketService from "../services/dao/ticket.dao.js";
import TicketService from "../services/dao/ticket.dao.js";

const cartService = new CartService
const tickerService = new TicketService


export const getCartbyId = async(req, res) => {
    try {
        const cid = req.user.carritos[0]

        console.log("es el cid desde el getcartid");
        console.log(cid);

        let cart = await cartService.getCid(cid)
        console.log(JSON.stringify(cart, null, '\t'));
        res.render("cart", {cart})
    } catch (error) {
        console.error("Hubo un problema conectandose a la persistencia de los carritos."  + error);
        res.status(500).send({ error: error });
    }
}

export const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getAll()
        console.log(JSON.stringify(carts, null, '\t'));
        res.send(carts)
    } catch (error) {
        console.error("Hubo un problema conectandose a la persistencia de los carritos." + error);
        res.status(500).send({ error: error });
    }
}
//         boton(idddd)
export const pushProducts = async (req, res) => {
    try {
        // obtener user
        
        const cid = req.user.carritos[0]

        console.log("es el cid");
        console.log(cid);
        
        const pid = req.body
        console.log("es el pid");
        console.log(pid);
        const cart = await cartModel.findOne({'_id': new mongoose.Types.ObjectId(cid)})
        // busco el carrito y el producto con sus id's
        const product = await ProductModel.findById(pid.id)
        console.log(product);

        const validation = cart.producto.find(prod => prod.prods._id == pid.id)

        if(validation){
            validation.quantity++
        }else{
            cart.producto.push({prods: product})
        }
        
        const result = await cartModel.findOneAndUpdate({_id: cid}, {$set: cart}, {new: true})

        res.send('holi')
    } catch (error) {
        console.error("No se pudo agregar producto al carrito " + error);
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
            console.log('se vacio el carrito');
        }
        res.send('carrito vaciado')
    } catch (error) {
        console.error("No se pudo vaciar el carrito " + error);
        res.status(500).send({error: "No se pudo vaciar el carrito", message: error});
    }
}

export const terminarCompra = async(req, res) => {
    try {
        const cid = req.user.carritos[0]
        console.log("es el cid desde comprar");
        console.log(cid);

        // carrito (cid)
        let cart = await cartService.getCid(cid)
        console.log(JSON.stringify(cart.producto, null, '\t'));

        // suma total de los productos en el carrito
        const total = cart.producto.reduce((resultado , cantidad) => {
            return (resultado + cantidad.prods.precio);
        }, 0 )
        console.log(total);
        
        // usuario del carrito
        const usuario = req.user.email
        console.log("este es el usuario");
        console.log(usuario);
        
        const ticket = {usuario, total}
        console.log(ticket);
        const pusTicket = await tickerService.crearTicket(ticket)

        if(pusTicket){
            cart.producto = []
            await cart.save()
            console.log('se vacio el carrito');
        }
        res.send(pusTicket)
    } catch (error) {
        console.error("No se pudo realizar la compra " + error);
        res.status(500).send({error: "No se pudo realizar la compra", message: error});
    }
}


// export const crearCart = async (req, res) => {
//     try {
//         const user = req.user
//         console.log("log de usuario del carrito :D ");
//         console.log(user)
//         res.send("ola")
//     } catch (error) {
//         console.error("No se pudo crear el carrito: " + error);
//         res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
//     }
// }