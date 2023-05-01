import { Router } from 'express'
import { cartModel } from '../dao/models/cartsSchema.js'

const router = Router()

router.get('/:cid', async (req, res) => {
    let cid = req.params.cid
    let cartView = await cartModel.findById(cid)
    console.log(JSON.stringify(cartView, null, '\t'));
    res.render('cart', {cartView})
})


export default router