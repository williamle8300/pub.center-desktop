var Async = require('async')
var React = require('react')
var Request = require('superagent')

var FeedBanner = require('./FeedBanner')
var ArticleList = require('./ArticleList')


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
	    	<h1>Feed</h1>
				{
					this.props._feed_
					? (
						<div>
				    	<FeedBanner feed={this.state.feed}/>
							<ArticleList articles={this.state.articles}/>
							<button onClick={this.getMoreArticles}>Show More</button>
						</div>
					)
					: null
				}
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
		.get('https://pub.center/article?feed='  +encodeURIComponent(this.props._feed_)+ '&page=' +this.state.page)
		.end((err, response) => {

			if (err) {
				callback(err)
				return
			}

			callback(null, response.body)
			return
		})
	},
	getMoreArticles: function () {
		
		this.setState({page: ++this.state.page}, () => {
			
			this.getArticles((err, results) => {
				
				this.setState({articles: this.state.articles.concat(results)})
			})
		})
	} 
})