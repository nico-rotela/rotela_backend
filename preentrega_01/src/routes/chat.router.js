import express from 'express'
// import { chatModel } from '../dao/models/chatSchema'

const router = express.Router()

router.get('/', async (req, res) => {
    
    res.render('chat')
})

export default router