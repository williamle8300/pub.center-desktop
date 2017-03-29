var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'

var FeedMeta = require('./FeedMeta')
var CompleteFeedList = require('./CompleteFeedList')
var ArticleList = require('./ArticleList')

var H1 = require('./H1')
var Container = require('./Container')


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		_feed_: React.PropTypes.string
	},
  render: function () {
    return (
			<Container>
	      <H1>Archived Feeds</H1>
				{
					this.props._feed_
					? (
						<Container style={{padding: this.props.width > 1000 ? this.props.muiTheme.spacing.desktopGutter : '0'}}>
				    	<FeedMeta width={this.props.width} height={this.props.height} jwt={this.props.jwt} user={this.props.user} _feed_={this.props._feed_}/>
							<ArticleList _feed_={this.props._feed_}/>
						</Container>
					)
					: <CompleteFeedList/> 
				}
			</Container>
    )
  }
}))