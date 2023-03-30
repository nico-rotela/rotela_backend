import express  from "express";
import productosManager from "./routes/productos.router.js"
import cartManager from "./routes/carts.router.js";
import viewsProducts from "./routes/views.Prod.js"
import realTimeProducts from './routes/realTime.prod.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {Server} from 'socket.io'


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
app.use('/api/prodviews', viewsProducts)

// websocket
app.use('/api/prodrealtime', realTimeProducts)

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