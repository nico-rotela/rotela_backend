import Router from 'express'

const router = Router()

router.get('/login', (req,res) => {
    res.render('github-login')
})

router.get('/', (req,res) => {
    res.redirect('/api/users')
})

router.get('/error', (req,res) => {
    res.render('error', {error: "no se pudo autenticar usando gitHub!"})
})

export default router