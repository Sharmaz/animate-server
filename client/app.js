const webrtc2images = require('webrtc2images')
const record = document.querySelector('#record')

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
		console.log(frames)
	})

}, false)