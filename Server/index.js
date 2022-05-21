import { Server } from "socket.io";

const io = new Server(8000, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    socket.on('get-document', documentId => {
        const data = ''
        socket.join(documentId)
        socket.emit('load-document', data)
        socket.on('send-changes', delta => {
            // console.log(delta);
            // socket.broadcast.emit('receive-changes', delta)
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })
    })
    // console.log('Connected');
})