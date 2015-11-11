'use strict'

const http = require('http')
const port = process.env.PORT || 8080

const server = http.createServer(onRequest)
server.listen(port, onListening)

function onRequest(req, res) {
	res.end('Hola NodeJS')
}

function onListening() {
	console.log('Servidor escuchando en: ' + port)
}


