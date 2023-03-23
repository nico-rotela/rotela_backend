import Express  from "express";
import productosManager from "./routes/productos.router.js"
import cartManager from "./routes/carts.router.js";

const app = Express()
const port = 8080

// preparar la configuracion del servidor para recibir objetos JSON
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.use('/api/productos/', productosManager)
app.use('/api/carts/', cartManager)

app.get('/', (req, res) => {
    res.send("holiis")
})

// escuchando el servidor
app.listen(port, () => {
    console.log(`server corriendo en el servidor: ${port}`);
})
