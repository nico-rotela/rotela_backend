import ProductService from "../services/dao/product.dao.js"
import { ProductModel } from "../services/models/productsSchema.js";
import userModel from "../services/models/userSchema.js";

const productService = new ProductService

export const addProduct = async (req, res) => { 
    let user = req.user
    console.log(" desde el addprod", user.role);
    try {

            if(user.role === "admin"){
                const owner = user.email
                const ownerRol = user.role
                const {titulo, precio, stock} = req.body
                const prod = {titulo, precio, stock, owner, ownerRol}
                if(!titulo || !precio || !stock) return res.status(400).send({ status: "error", error: "Incomplete values" });
                let producto = await productService.save(prod)
                res.status(201).render('addProduct', {producto})
            }else {
                (user.role === " userPremiun")
                const owner = user.email
                const ownerRol = user.role
                const {titulo, precio, stock} = req.body
                const prod = {titulo, precio, stock, owner, ownerRol}
                if(!titulo || !precio || !stock) return res.status(400).send({ status: "error", error: "Incomplete values" });
                let producto = await productService.save(prod)
                res.status(201).render('addProduct', {producto})     
            }
        } catch (error) {
            req.logger.error("se intento agregar un producto")
            res.status(400).send("no se puedo agregar el producto")
        }
        
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
        let id = req.body.id
        let idProd = await ProductModel.findById(id)
        console.log(idProd);

        if (idProd.ownerRol === "userPremiun") {
            console.log("en el id del premium");
            await productService.delete(id)
            res.send({status: "producto eliminado"})
            req.lgger.warning("se a eliminado un producto de la base de datos")
        }else {
            console.log("esty en el else");
            await productService.delete(id)
            res.send({status: "producto eliminado"})
            req.lgger.warning("se a eliminado un producto de la base de datos")
        }

    } catch (error) {
        req.logger.error("No se pudo eliminar el producto: " + error)
    }
}

export const prueba = (req, res) => {
    let user = req.user
    if(user){
        console.log("en el if");
        res.send(user)
    }
}


