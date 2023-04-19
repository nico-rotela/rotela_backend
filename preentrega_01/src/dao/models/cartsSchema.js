import mongoose from "mongoose";

const cartCollection = 'carrito'

// defiino los schemas
const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const numberTypeSchemaNonUniqueRequerired = {
    type: Number,
    required: true
}

const cartSchema = ({
    nombre: stringTypeSchemaNonUniqueRequired,
    prods: {
        type: [
            {
                producto:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'productos'
                }
            }
        ],
        default: []
    }
})
// SOLO CREAR EL ARRAY
export const cartModel = mongoose.model(cartCollection, cartSchema)

