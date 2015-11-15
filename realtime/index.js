'use strict'

const socketio = require('socket.io')

module.exports = function (server) {
	const io = socketio(server)

	io.on('connection', onConnection)

	function onConnection (socket) {
		console.log(`client connected ${socket.id}`)
	}
}