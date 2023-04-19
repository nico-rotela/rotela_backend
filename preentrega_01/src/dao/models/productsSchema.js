import mongoose from "mongoose";

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

const productSchema = ({
    titulo: stringTypeSchemaNonUniqueRequired,
    precio: numberTypeSchemaNonUniqueRequerired,
    stock: numberTypeSchemaNonUniqueRequerired
})

export const ProductModel = mongoose.model(productCollection, productSchema)