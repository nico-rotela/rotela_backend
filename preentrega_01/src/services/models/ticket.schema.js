import mongoose,{Schema} from "mongoose";

mongoose.pluralize(null)

const collection = "ticket";

const schema = ({
    email: String,
    total: Number,
    fecha: String
})

const ticketModel = mongoose.model(collection,schema);
export default ticketModel;