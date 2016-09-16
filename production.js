var express = require('express')
var app = express()
var path = require('path')

var config = require('./config')


app.use(express.static(__dirname))

app.get('/*', function (request, response) {
	response.sendFile(path.join(__dirname+ '/index.html'))
})

app.listen(
	config.port,
	// 3000,
	config.address,
	// '127.0.0.1',
	function () {
		console.log('listening')
})