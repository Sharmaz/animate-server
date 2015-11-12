const st = require('st')
const path = require('path')
const course = require('course')

const mount = st({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html',
	passthrough: true
})

function onRequest (req, res) {
	mount(req, res, function(err) {
		if (err) return fail(err, res)

		router(req, res, function (err) {
			if (err) return fail(err, res)

			res.statusCode = 404
			res.end(`Not Found ${req.url}`)
		})


	})
}

function fail (err, res) {
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain')
	res.end(err.message)
}

module.exports = onRequest