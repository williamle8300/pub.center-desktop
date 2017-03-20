var React = require('react')

var FeedMeta = require('./FeedMeta')
var CompleteFeedList = require('./CompleteFeedList')
var ArticleList = require('./ArticleList')
var {Block, Text, Heading} = require('rebass')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		_feed_: React.PropTypes.string
	},
  render: function () {
    return (
			<div>
				<Block borderLeft color="blue" px={2}>
					<Heading>
			      Archived Feeds
			    </Heading>
					<Text>
			      Type to begin searching, or paste an RSS url
			    </Text>
				</Block>
				{
					this.props._feed_
					? (
						<div>
				    	<FeedMeta jwt={this.props.jwt} user={this.props.user} _feed_={this.props._feed_}/>
							<ArticleList _feed_={this.props._feed_}/>
						</div>
					)
					: <CompleteFeedList/> 
				}
			</div>
    )
  }
})