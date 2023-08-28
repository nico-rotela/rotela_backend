import { ProductModel } from "../models/productsSchema.js";

export default class productService {

    save = async (prod) => {
        let producto = ProductModel.create({titulo: prod.titulo, precio: prod.precio, stock: prod.stock, owner: prod.owner, ownerRol: prod.ownerRol})
        return producto
    }

    getProducts = async() => {
        let getProd = ProductModel.find().lean()
        return getProd
    }

    delete = async(id)=>{
        let prod = ProductModel.findByIdAndDelete({_id: id})
        return prod
    }
    
    
}

