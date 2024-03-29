import { Router } from "express";
import { ProductModel } from "../services/models/productsSchema.js";
import { getProduct} from "../controllers/products.controler.js";
import { authorization, passportCall, restringirUser } from "../utils.js";

const router = Router()

// muestro todos los productos cargados en la base de datos
router.get('/allproducts',passportCall('jwt'),authorization("admin"), getProduct)

// renderizado del post(logica en: api/productos, productmanager)
router.get('/addprod', passportCall('jwt'), (req, res) => {
    const user = req.user
    res.render('addProduct', {user: user})
})

// productos usando paginate
router.get('/', passportCall('jwt'),
    // authorization("user")
    async (req, res) => {
    let user = req.user    
    let page = parseInt(req.query.page)
    if(!page) page = 1
    let result = await ProductModel.paginate({},{page,limit:3,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/api/prodviews?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/api/prodviews?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('home', {
        result: result,
        user: user
    })
})

export default router