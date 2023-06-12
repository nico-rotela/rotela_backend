import CartService from "../services/dao/carts.dao.js";
import { ProductModel } from "../services/models/productsSchema.js";

const cartService = new CartService


export const getCartbyId = async(req, res) => {
    try {
        const cid = req.params.cid
        const carts = await cartService.getCid(cid)
        console.log('info desde el controller');
        console.log(JSON.stringify(carts, null, '\t'));
        res.render('cart', {carts})
    } catch (error) {
        console.error("Hubo un problema conectandose a la persistencia de los carritos.");
        res.status(500).send({ error: error });
    }
}

export const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getAll()
        console.log(JSON.stringify(carts, null, '\t'));
        res.send(carts)
    } catch (error) {
        console.error("Hubo un problema conectandose a la persistencia de los carritos.");
        res.status(500).send({ error: error });
    }
}

export const pushProducts = async (req, res) => {
    try {
        const {cid, pid} = req.body

        // busco el carrito y el producto con sus id's
        const carts = await cartService.getCid(cid)
        const product = await ProductModel.findById(pid)

        let validarProd = carts.producto.find(prod => prod.prods == product)

        if(validarProd){
            validarProd.quantity += 1
        }else{
            carts.producto.push({prods: product})
        }

        let result = await cartService.pushProd(carts)
        console.log('resultado del carrito(controller)');
        console.log(JSON.stringify(carts, null, '\t'));

        res.send(result)
    } catch (error) {
        console.error("No se pudo agregar producto al carrito " + error);
        res.status(500).send({error: "No se pudo agregar producto al carrito", message: error});
    }

    
}

export const vaciarCarrito = async (req, res) => {
    const {cid} = req.body
    let cart = await cartService.getCid(cid)

    if (cart) {
        cart.producto = []
        await cart.save()
    } 
    console.log('se vacio el carrito');
    res.send(cart)
}

export const crearCart = async (req, res) => {
    try {
        let {nombre} = req.body
        let cart = await cartService.crearCart(nombre)
        res.send(cart)
    } catch (error) {
        console.error("No se pudo crear el carrito: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
}