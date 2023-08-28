import dotenv from 'dotenv'

console.log(process.env.PORT);

const environment = "desarrollo"

dotenv.config(
    {
        path: environment === "produccion" ? "./src/config/.env.produccion" : "./src/config/.env.desarrollo"
    }
    )
       
export default {
    port: process.env.PORT,
    mongourl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminpassword: process.env.ADMIN_PASSWORD

}