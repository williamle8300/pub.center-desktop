var Async = require('async')
var React = require('react')
var Request = require('superagent')

var FeedBanner = require('./FeedBanner')
var ListArticles = require('./ListArticles')


module.exports = React.createClass({
	
	propTypes: {
		_feed_: React.PropTypes.string
	},
	
	getInitialState: function () {
		return {
			feed: {},
			articles: [],
			page: 1
		}
	},
	
  render: function () {
    return (
			<div>
	    	<FeedBanner feed={this.state.feed}/>
				<ListArticles articles={this.state.articles}/>
			</div>
    )
  },
	componentDidMount: function () {

		Async.series({
			feed: this.getFeed,
			articles: this.getArticles
		}, (err, results) => {
			
			this.setState(results)
		})
	},
	getFeed: function (callback) {

		Request
		.get('https://pub.center/feed/' +encodeURIComponent(this.props._feed_))
		.end((err, response) => {

			if (err) {
				callback(err)
				return
			}
			
			callback(null, response.body)
			return
		})
	},
	getArticles: function (callback) {

		Request
		.get('https://pub.center/article?feed='  +encodeURIComponent(this.props._feed_)+ '?page=' +this.state.page)
		.end((err, response) => {

			if (err) {
				callback(err)
				return
			}

			callback(null, response.body)
			return
		})
	}
	
})