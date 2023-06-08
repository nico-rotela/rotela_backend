import { ProductModel } from "../dao/models/productsSchema.js";

const recuperarDatos = async (req, res) => {
    let prodRender = await ProductModel.find().lean()
    console.log(prodRender);
    return prodRender
}

export default recuperarDatos