import userModel from "../models/userSchema.js"

export default class userService {

        getUsers = async () => {
                let getUser = userModel.find().lean()
                return getUser
        }

        deleteUser = async (idUser) => {
                let user = userModel.findByIdAndDelete(idUser)
                return user
        }
}
