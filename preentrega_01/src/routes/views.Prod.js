import { Router } from "express";
// import productManager from "../service/productManager.js"
import { ProductModel } from "../dao/models/productsSchema.js";
import getDatosControllers from '../controllers/products.controler.js'

const router = Router()

router.get('/prueba', getDatosControllers)

// muestro todos los productos cargados en la base de datos
router.get('/', async (req,res) => {
    try {
        let prodRender = await ProductModel.find().lean()
        res.render('home', {prodRender})
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
    }
})

// productos usando paginate
router.get('/prods', async (req, res) => {
    const user = req.session.user

    let page = parseInt(req.query.page)
    if(!page) page = 1

    let result = await ProductModel.paginate({},{page,limit:3,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/api/prodviews/prods?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/api/prodviews/prods?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('home', {
        result: result,
        user: user
    })
})



// FS

// instancio la class de productos
// const productosManager = new productManager('/jsonProductos.json')

// router.get('/', async (req, res) => {
//     let prodRender = await productosManager.getProduct()
    
//     res.render('home', {prodRender})
// })



export default router