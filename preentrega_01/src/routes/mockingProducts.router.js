import Router from 'express';
import { getProductsMocking } from "../controllers/productsMocking.controler.js";

const router = Router()

router.get('/', getProductsMocking)

export default router