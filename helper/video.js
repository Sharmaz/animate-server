'use strict'

const EventEmitter = require('events').EventEmitter
const async = require('async')
const dataURIBuffer = require('data-uri-to-buffer')
const fs = require('fs')
const os = require('os')
const path = require('path')
const uuid = require('uuid')

module.exports = function (images) {
	let events = new EventEmitter()
	let count = 0
	let baseName = uuid.v4()
	let tmpDir = os.tmpDir()

	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		cleanup
		], converFinished)

	function decodeImages (done) {
		async.eachSeries(images, decodeImage, done)
	}

	function decodeImage (image, done) {
		let fileName = `${baseName}-${count++}.jpg`
		let buffer = dataURIBuffer(image)
		let ws = fs.createWriteStream(path.join(tmpDir, fileName))

		ws.on('error', done)
			.end(buffer, done)

		events.emit('log', `Converting $(fileName`)
	}

	function createVideo (done) {
		done()
	}

	function encodeVideo (done) {
		done()
	}

	function cleanup (done) {
		done()
	}

	function converFinished (err) {
		setTimeout(function () {
		events.emit('video', 'this will be the encoded video')
		}, 1000)
	}

	return events
}