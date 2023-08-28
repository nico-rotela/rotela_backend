import { Router } from "express";
import passport from "passport";
import {register, login, newRol, deleteUserById} from '../controllers/users.controller.js'

const router = Router()
router.post('/register', register)
router.post('/login', login)
router.post('/id', newRol)
router.post('/delete', deleteUserById)








// GITHUB SESSION
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req, res) => {})
router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/github");
});

export default router











