import expess from 'express'
import productManager from '../../segDesafio.js'

const productosImp = new productManager('../../files')
// console.log(productosImp);


// servidor y express
const app = expess()
const port = 8080


// escuchando al servidor
app.listen(port, () => {
    console.log(`usando el servidor: ${port}`);
})

app.get('/productos', async (req, res) => {
    const productos = await productosImp.getProduct()
    const { limit } = req.query;
    res.json(limit ? productos.slice(0, limit) : productos)
})

app.get('/:productoId', async (req, res) => {
    const prodId = await productosImp.getProductById(parseInt(req.params.productoId))
    res.send(prodId)

})