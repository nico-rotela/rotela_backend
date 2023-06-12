import ProductService from "../services/dao/product.dao.js"

const productService = new ProductService

export const addProduct = async(req, res) => { 
    try {
        let prod = req.body
        let producto = await productService.save(prod)
        res.send(producto)
    } catch (error) {
        console.error("No se pudo cargar el producto: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
}

export const getProduct = async(req, res) => {
    try {
        let prodRender = await productService.getProducts()
        res.render('home', {prodRender})
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
}
