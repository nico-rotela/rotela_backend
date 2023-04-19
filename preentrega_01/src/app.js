import express  from "express";
import productosManager from "./routes/productos.router.js"
import cartManager from "./routes/carts.router.js";
// import viewsProducts from "./routes/views.Prod.js"
// import realTimeProducts from './routes/realTime.prod.js'
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

// hbs
// app.use('/api/prodviews', viewsProducts)

// websocket
// app.use('/api/prodrealtime', realTimeProducts)

// escuchando el servidor
const httpServer = app.listen(port, () => {
    console.log(`server corriendo en el servidor: ${port}`);
})

const socketServer = new Server(httpServer)

// abro el canal de comunicacion
socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado!');

    // escuchamos al cliente
    socket.on('msg', data => {
        console.log(data);
    })

    socket.emit('msg_02', 'mensage enviado desde el back')

    const logs = [];
   
    socket.on("producto",data=>{
        logs.push({socketid:socket.id,producto:data})
        socketServer.emit('log',{logs});
    });

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
