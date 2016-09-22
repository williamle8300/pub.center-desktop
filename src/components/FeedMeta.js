var React = require('react')
var Request = require('superagent')

var config = require('../../config')


module.exports = React.createClass({

	propTypes: {
		_feed_: React.PropTypes.string.isRequired,
	},
	
	getInitialState: function () {
		return {
			/*
			??
			*/
		}
	},

	render: function () {
		return (
			<div>
				<h2>
					<a href={this.state.url}>{this.state.name}</a>
				</h2>
			</div>
		)
	},
	
	componentDidMount: function () {
		
		Request
		.get(config.backend+ '/feed/' +encodeURIComponent(this.props._feed_))
		.end(function (err, response) {

			if (err) {
				throw err
			}
			
			this.setState(response.body)
		}.bind(this))
	}
})