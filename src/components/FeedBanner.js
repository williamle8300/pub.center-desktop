var React = require('react')

module.exports = React.createClass({

	propTypes: {
		feed: React.PropTypes.object.isRequired,
	},

	render: function () {
		return (
			<h2>{this.props.feed.name}</h2>
		)
	}
})