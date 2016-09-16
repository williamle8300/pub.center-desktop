var Async = require('async')
var React = require('react')
var Request = require('superagent')


module.exports = React.createClass({
  render: function () {
    return (<h1>feed</h1>)
  },
	componentDidMount: function () {

		Async.series([
			this.getFeed,
			this.getFeedArticles
		], (err, results) => {
			console.log(results)
		})
	},
	getFeed: function (callback) {

		Request
		.get('http://localhost:3001/feed/http://feeds2.feedburner.com/ignant')
		.end((err, response) => {

			if (err) {
				callback(err)
				return
			}

			callback(null, response.body)
			return
		})
	},
	getFeedArticles: function (callback) {

		Request
		.get('http://localhost:3001/article?feed=http://feeds2.feedburner.com/ignant')
		.end((err, response) => {

			if (err) {
				callback(err)
			}

			callback(null, response.body)
		})
	}
})