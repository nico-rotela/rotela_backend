import { Router } from 'express'
import {getCartbyId} from '../controllers/carts.cotroller.js'
import { passportCall } from "../utils.js";


const router = Router()

router.get('/cartUsuario',passportCall('jwt'), getCartbyId)



export default router