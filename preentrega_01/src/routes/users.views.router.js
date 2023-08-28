import { Router } from "express";
import { authorization, passportCall } from "../utils.js";
import { getAllUsers } from "../controllers/users.controller.js";

const router = Router()

router.get('/login', (req, res) => {res.render('login')})
router.get('/register', (req, res) => {res.render('register')})
router.get('/', passportCall('jwt'),(req, res) => {res.render('profile', {user: req.user})})
router.get('/allusers', getAllUsers), authorization("admin")




export default router