import { Router } from "express";
import { authToken } from "../utils.js";

const router = Router()

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/', authToken, (req, res) => {
    res.render('home', {
        // user: req.session.user
        user: req.user
    })
})

export default router