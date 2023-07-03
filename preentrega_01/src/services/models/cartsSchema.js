import mongoose from "mongoose";

mongoose.pluralize(null) // Importante! para no tener problemas con Mongoose

const cartCollection = 'carritos'

// defiino los schemas

const cartSchema = ({
    producto: {
        type: [
            {
                prods:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'productos'
                },
                quantity: {
                type: Number,
                default: 1
                }
            }
        ],
        default: []
    }
})

export const cartModel = mongoose.model(cartCollection, cartSchema)

