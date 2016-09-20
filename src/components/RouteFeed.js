var React = require('react')

var Feed = require('./Feed')


module.exports = React.createClass({
  render: function () {
    return (
			<div>
	    	<h1>Feed</h1>
				{
					this.props._feed_
					? <Feed _feed_={this.props._feed_}/>
					: null
				}
			</div>
    )
  }
})