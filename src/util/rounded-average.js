module.exports = function (array, key, decimalRound) {
	
	if (!array) return 0
	if (!Array.isArray(array)) throw new Error('First argument must be an array')
	if (typeof key !== ('string' || 'undefined')) throw new Error('Optional argument "key" should be string')
	if (typeof decimalRound !== ('number' || 'undefined')) throw new Error('Optional argument "decimalRound" should be number')

	var rawAverage = (
		array
		.map((x) => {
			return key ? x[key] : x
		})
		.reduce((a, b) => a + b)
		/
		array.length
	)
	var roundedAverage = Math.round(rawAverage * decimalRound) / decimalRound

	return roundedAverage
}