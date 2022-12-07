// Server is created using NodeJS module --> http
// NodeJS Application
const http = require('http')
const app = require('./app')

const PORT = process.env.PORT || 5001

const server = http.createServer(app)
server.listen(PORT)