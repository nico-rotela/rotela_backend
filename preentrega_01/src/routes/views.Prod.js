import { Router } from "express";
// import productManager from "../service/productManager.js"
import { ProductModel } from "../dao/models/productsSchema.js";

const router = Router()

router.get('/', async (req,res) => {
    try {
        let prodRender = await ProductModel.find().lean()
        res.render('home', {prodRender})
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})


// FS

// instancio la class de productos
// const productosManager = new productManager('/jsonProductos.json')

// router.get('/', async (req, res) => {
//     let prodRender = await productosManager.getProduct()
    
//     res.render('home', {prodRender})
// })



export default router