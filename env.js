module.exports = {
	//NODE_ENV will be implicitly set via react-scripts@npm
	backend: process.env.NODE_ENV === 'production' ? 'https://pub.center' : 'http://localhost:3001',
	stripePublicKey: process.env.NODE_ENV === 'production' ? 'pk_PzXnmOKSfn85iHi2gXAUhA7B5vuOz' : 'pk_2ZeyzfdZ4lvASex9TSSTxNlYK1mr9'
}