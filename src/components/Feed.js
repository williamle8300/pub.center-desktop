var React = require('react')

var FeedMeta = require('./FeedMeta')
var CompleteFeedList = require('./CompleteFeedList')
var ArticleList = require('./ArticleList')


module.exports = React.createClass({
	
	propTypes: {
		_feed_: React.PropTypes.string
	},
	
  render: function () {
    return (
			<div>
	    	<h1>Feed</h1>
				{
					this.props._feed_
					? (
						<div>
				    	<FeedMeta _feed_={this.props._feed_}/>
							<ArticleList _feed_={this.props._feed_}/>
						</div>
					)
					: <CompleteFeedList/> 
				}
			</div>
    )
  }
})