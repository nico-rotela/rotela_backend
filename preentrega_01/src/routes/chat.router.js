import express from 'express'
// import { chatModel } from '../dao/models/chatSchema'
import { authorization, passportCall } from "../utils.js";

const router = express.Router()

router.get('/', 
    passportCall('jwt'), //-> Usando JWT por Cookie usando customCall
    authorization("user"),
    async (req, res) => {
    
    res.render('chat')
})

export default router