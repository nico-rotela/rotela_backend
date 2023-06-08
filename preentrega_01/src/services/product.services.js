import recuperarDatos from "../model/productData.js"

const obtenerDatos = async () => {
    return await recuperarDatos()
}

export default obtenerDatos