import { Router } from 'express'
import {getCartbyId} from '../controllers/carts.cotroller.js'

const router = Router()

router.get('/:cid', getCartbyId)

// router.get('/:cid', async (req, res) => {
//     let cid = req.params.cid
//     let cartView = await cartModel.findById(cid).populate('producto.prods')
//     console.log(JSON.stringify(cartView, null, '\t'));
//     res.render('cart', {cartView})
// })


export default router