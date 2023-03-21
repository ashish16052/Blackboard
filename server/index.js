const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blackboard');
const Document = require('./Document')

const io = require("socket.io")(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

const findOrCreate = async (id) => {
    if (!id)
        return
    const document = await Document.findById(id)
    if (document)
        return document
    else
        return await Document.create({ _id: id, data: "" })
}

io.on('connection', socket => {
    socket.on('join', async id => {
        const document = await findOrCreate(id)
        socket.join(id)
        socket.emit('load-doc', document.data)
        socket.on('send-changes', delta => {
            socket.to(id).emit('recv-changes', delta)
        })
        socket.on('save', async data => {
            await Document.findByIdAndUpdate(id, { data })
        })
    })
})