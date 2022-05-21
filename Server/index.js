import { Server } from "socket.io";
import dotenv from 'dotenv'

dotenv.config()

import connectDB from "./config/db.js";
import {getDocument} from './controllers/docController.js'
import {updateDocument} from './controllers/docController.js'

connectDB()

const io = new Server(8000, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        // const data = ''
        const document = await getDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)
        socket.on('send-changes', delta => {
            // console.log(delta);
            // socket.broadcast.emit('receive-changes', delta)
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        socket.on('save-document', async data => {
            await updateDocument(documentId, data)
        })
    })
    // console.log('Connected');
})