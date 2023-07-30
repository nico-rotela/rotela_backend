import { genrateProducts } from "../utils.mocking.js";

export const getProductsMocking = async (req, res) => {
    try {
        let products = []
        for (let i = 0; i < 100; i++) {
            products.push(genrateProducts())
        }
        res.send({status: "succes", payload: products})
    } catch (error) {
        console.error(error)
        res.status(500).send({error: error, mensage: "no no pudo obtener los productos"})
    }
}