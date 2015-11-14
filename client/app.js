const webrtc2images = require('webrtc2images')
const record = document.querySelector('#record')
const xhr = require('xhr')

const rtc = new webrtc2images({
	width: 200,
	height: 200,
	frames: 10,
	type: 'image/jpeg',
	quality: 0.4,
	interval: 200
})

rtc.startVideo(function (err) {

})


record.addEventListener('click', function(e) {
	e.preventDefault()

	rtc.recordVideo(function(err, frames) {
		if (err) return logError(err)

		xhr({
			uri: '/process',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ images: frames })
		}, function (err, res, body) {
			if (err) return logError(err)

			body = JSON.parse(body)

			if (body.video) {
				const video = document.querySelector('#video')
				video.src = body.video
				video.loop = true
				video.play()
			}
		})

	})

}, false)

function logError (err) {
	console.error(err)
}