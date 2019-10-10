const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const dotenv = require('dotenv')

const cors = require('cors')

const corsOptions = {
	exposedHeaders: 'auth-token'
}

const routes = require('./routes')

dotenv.config()

const app = express()
const server = http.Server(app)
const io = socketio(server)


mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
	},
	() => console.log("Connected to Mongo!")
)

const connectedUsers = {}

io.on('connection', socket => {
	const { user_id } = socket.handshake.query

	connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
	req.io = io
	req.connectedUsers = connectedUsers

	return next()
})

app.use(cors(corsOptions))
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333)
