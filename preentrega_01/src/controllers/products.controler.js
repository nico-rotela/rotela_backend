import ProductService from "../services/dao/product.dao.js"
import CustomError from "../services/errors/middlewares/customError.js"
import { generateProductErrorInfo } from "../services/errors/messages/product-create-error-message.js"
// import { ProductModel } from "../services/models/productsSchema.js"
import EErrors from "../services/errors/middlewares/enums.js"

const productService = new ProductService

export const addProduct = async(req, res) => { 
        const {titulo, precio, stock} = req.body
        const prod = {titulo, precio, stock}

        if(!titulo || !precio || !stock) return res.status(400).send({ status: "error", error: "Incomplete values" });
            
        let producto = await productService.save(prod)
        res.status(201).render('addProduct', {producto})
}

export const getProduct = async(req, res) => {
    try {
        let prodRender = await productService.getProducts()
        res.render('home', {prodRender})
    } catch (error) {
        req.logger.error("No se pudo obtener productos con moongose: " + error)
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id
        await productService.delete(id)

        res.send({status: "producto eliminado"})
    } catch (error) {
        req.logger.error("No se pudo eliminar el producto: " + error)
    }

}



