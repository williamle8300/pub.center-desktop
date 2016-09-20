var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link


module.exports = React.createClass({
	render: function () {
		return (
			<ul>
				<li>
					<Link href="/">home</Link>
				</li>
				<li>
					<Link href="/documentation">documentation</Link>
				</li>
				<li>
					<Link href="/feed">feed</Link>
				</li>
				<li>
					<Link href="/user">user</Link>
				</li>
			</ul>
		)
	}
})