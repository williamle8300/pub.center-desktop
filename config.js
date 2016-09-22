module.exports = {
	//NODE_ENV will be implicitly set via react-scripts@npm
	backend: process.env.NODE_ENV === 'production' ? 'https://pub.center' : 'http://localhost:3001'
}