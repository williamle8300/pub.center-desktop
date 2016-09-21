var React = require('react')
var Request = require('superagent')
var Router = require('react-router-component')
var Link = Router.Link

var config = require('../../config')


module.exports = React.createClass({
	getInitialState: function () {
		return {
			feeds: []
		}
	},
	render: function () {
		return (
			<div>
				{
					this.state.feeds.map((feed) => {
						return (
							<div>
								<Link key={feed.id} href={'/feed/' +feed.id}>{feed.name}</Link>
							</div>
						)
					})
				}
			</div>
		)
	},
	componentDidMount: function () {
		
		Request
		.get(config.backend+ '/feed')
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.setState({feeds: response.body})
		})
	}
})