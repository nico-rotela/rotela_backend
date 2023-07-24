import { Router } from "express";
import passport from "passport";


const router = Router()

// register
router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });


router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});


// destruir la session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error){
            res.json({error: 'error de logout', msg: 'error al cerrar session'})
        }
        res.render('logout')
    })
})

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











