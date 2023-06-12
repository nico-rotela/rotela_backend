import { cartModel } from "../models/cartsSchema.js"

export default class cartService {

    getCid = async (cid) => {
        let cart = await cartModel.findById(cid).populate('producto.prods')
        return cart
    }

    getAll = async () => {
        let carts = await cartModel.find().populate('producto.prods')
        return carts
    }

    pushProd = async (carts) => {
        let push = await cartModel.updateOne(carts)
        return push
    }

    crearCart = async (nombre) => {
        let cart = await cartModel.create({nombre})
        return cart
    }
}