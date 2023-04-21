import express  from "express";
import productosManager from "./routes/productos.router.js"
import cartManager from "./routes/carts.router.js";
import viewsProducts from "./routes/views.Prod.js"
import chat from './routes/chat.router.js'
import { chatModel } from "./dao/models/chatSchema.js";
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {Server} from 'socket.io'
import mongoose from 'mongoose'


const app = express()
const port = 8080

// preparar la configuracion del servidor para recibir objetos JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// configuracion de hbs(handlerbars)
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');

// carpeta public
app.use(express.static(__dirname+'/public'));

// configuro los routes
app.use('/api/productos/', productosManager)
app.use('/api/carts/', cartManager)

     // HANDLEBARS
// renderizado de los productos cargados
app.use('/api/prodviews', viewsProducts)

// CHAT
app.use('/api/chat', chat)

// escuchando el servidor
const httpServer = app.listen(port, () => {
    console.log(`server corriendo en el servidor: ${port}`);
})

const socketServer = new Server(httpServer)
let messages = []

// abro el canal de comunicacion
socketServer.on('connection', socket =>{

    // CHAT
    // recibo el mensaje
    socket.on('message', async data => {
       await chatModel.insertMany(data)
       messages.push(data)
        socketServer.emit('messageLogs' , messages )
    })

    // alerta de que un usuario se conecto al chat a los demas conectados
    socket.on('userConnected', data => {
        socket.broadcast.emit('userConnected', data.user)
    })


})

// conectamos a la base de datos
const DB = 'mongodb+srv://nicolasrotela:nicolas@cluster0.md0jeex.mongodb.net/Ecommerce?retryWrites=true&w=majority'
const connectMongoDB = async()=>{
    try {
        await mongoose.connect(DB)
        console.log("Conectado con exito a MongoDB usando Mongoose");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB()
