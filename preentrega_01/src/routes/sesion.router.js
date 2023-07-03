import { Router } from "express";
import passport from "passport";


const router = Router()

// register
router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });


// el login se haria directamente desde el jwt

// login
// router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
//     console.log("User found to login:");
//     const user = req.user;
//     console.log('user: desde post de login', user);
//     if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
    
//     // req.session.user = {
//     //     id: user._id,
//     //     name: `${user.first_name} ${user.last_name}`,
//     //     email: user.email,
//     //     age: user.age
//     // }

//     const acces_token = generateJWToken(user)
//     console.log(acces_token);
//     res.send({acces_token: acces_token})
//     // res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
// });




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











