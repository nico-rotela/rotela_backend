import mongoose,{Schema} from "mongoose";

mongoose.pluralize(null)

const collection = "users";

const schema = ({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    age: Number,
    password:String,
    loggedBy: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'userPremiun', 'admin'],
    },
    carritos: [{
        ref: "carritos",
        type: mongoose.Schema.Types.ObjectId,
    }]
})

const userModel = mongoose.model(collection,schema);
export default userModel;