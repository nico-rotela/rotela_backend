import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'productos'

// definimos los esquemas
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

const productSchema = new mongoose.Schema ({
    titulo: stringTypeSchemaNonUniqueRequired,
    precio: numberTypeSchemaNonUniqueRequerired,
    stock: numberTypeSchemaNonUniqueRequerired,
    owner: String,
    ownerRol: {
        type: String,
        enum: ['admin', 'userPremiun']
    }
})

// usamos el plugins
productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model(productCollection, productSchema)