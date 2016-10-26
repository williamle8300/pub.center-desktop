module.exports = function (array, key, decimalRound) {
	
	var decimalRoundFunctor = decimalRound || 10
	var rawAverage = (
		array
		.map((x) => x[key])
		.reduce((a, b) => a + b)
		/
		array.length
	)
	
	return Math.round(rawAverage * decimalRoundFunctor) / decimalRoundFunctor
}