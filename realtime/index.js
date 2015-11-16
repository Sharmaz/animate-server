'use strict'

const database = require('../database')
const socketio = require('socket.io')
const helper = require('../helper')

module.exports = function (server) {
	const db = database()
	const io = socketio(server)
	io.on('connection', onConnection)

	function onConnection (socket) {
		console.log(`client connected ${socket.id}`)

		db.list(function (err, messages) {
			if (err) return console.error(err)

			socket.emit('messages', messages)
		})

		socket.on('message', function(message) {
			const converter = helper.convertVideo(message.frames)

			converter.on('log', console.log)

			converter.on('video', function (video) {
				delete message.frames
				message.video = video

				db.save(message, function (err) {

				})

				socket.broadcast.emit('message', message)

				socket.emit('messageack', message)
			})
		})
	}
}