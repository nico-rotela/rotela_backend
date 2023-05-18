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
import cartRemder from './routes/cart.render.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import sessionRouter from './routes/sesion.router.js'
import userviews from './routes/users.views.router.js'
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import githubLogin from './routes/github.login.views.router.js'


const app = express()
const port = 8080

// ---------------------      config json      ----------------------------
// preparar la configuracion del servidor para recibir objetos JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ---------------------     config handlebars       ----------------------------

// configuracion de hbs(handlerbars)
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');

// ---------------------     public       ----------------------------

// carpeta public
app.use(express.static(__dirname+'/public'));


// ---------------------     session       ----------------------------

// configurar objeto de config de SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nicolasrotela:nicolas@cluster0.md0jeex.mongodb.net/Ecommerce?retryWrites=true&w=majority',
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 40
    }) ,
    secret: 'nicosecret',
    resave: false,
    saveUninitialized: true
}))

// ---------------------     passport       ----------------------------
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// ---------------------      routes principales      ----------------------------

// configuro los routes
app.use('/api/productos/', productosManager)
app.use('/api/carts/', cartManager)

// ---------------------     otros routes       ----------------------------

// renderizado de los productos cargados
app.use('/api/prodviews', viewsProducts)

// CHAT
app.use('/api/chat', chat)

// vista del carrito
app.use('/api/cartviews', cartRemder)

// session
app.use('/api/session', sessionRouter)

// users
app.use('/api/users', userviews)

// loogin gitHub
app.use('/github', githubLogin)

// ---------------------     config server       ----------------------------

// escuchando el servidor
const httpServer = app.listen(port, () => {
    console.log(`server corriendo en el servidor: ${port}`);
})

// ---------------------     chat socket       ----------------------------


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

// ---------------------      coneccion a base de datos      ----------------------------

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
