import { Router } from "express";
// import productManager from "../service/productManager.js"
import { ProductModel } from "../services/models/productsSchema.js";
import { getProduct, } from "../controllers/products.controler.js";

const router = Router()


// muestro todos los productos cargados en la base de datos
router.get('/allproducts', getProduct)

// productos usando paginate
// router.get('/', paginateProducts)

router.get('/', async (req, res) => {
    // para ver los datos del usuario
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

// // instancio la class de productos
// const productosManager = new productManager('/jsonProductos.json')

// router.get('/', async (req, res) => {
//     let prodRender = await productosManager.getProduct()
    
//     res.render('home', {prodRender})
// })



export default router