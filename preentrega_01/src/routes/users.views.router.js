import { Router } from "express";
import { authorization, passportCall } from "../utils.js";

const router = Router()

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/', 
    passportCall('jwt'), //-> Usando JWT por Cookie usando customCall
    authorization("user"),
    (req, res) => {
    res.render('profile', {
        user: req.user
    })
})

export default router