import obtenerDatos from '../services/product.services.js'

const getDatosControllers = async (req, res) => {
    let datos = await obtenerDatos()
    res.json(datos)
}

export default getDatosControllers