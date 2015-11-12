'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 8080

const server = http.createServer()
server.on('request', onRequest)
server.on('listening', onListening)

server.listen(port)

function onRequest(req, res) {
	let index = path.join(__dirname, 'public', 'index.html')
	
	res.setHeader('Content-Type', 'text/html')
	let rs = fs.createReadStream(index)
	rs.pipe(res)
	
	rs.on('error', function(err) {
		res.end(err.message)
	})
	
}

function onListening() {
	console.log(`Servidor escuchando en el puerto: ${port}`)
}


