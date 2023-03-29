import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";

const app = Express()
const port = 8080

// preparar la configuracion del servidor para recibir objetos JSON
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// configuracion de hbs(handlerbars)
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views/");
app.set('view engine', 'handlebars');
