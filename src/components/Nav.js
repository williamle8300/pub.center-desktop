var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link

var Signin = require('./Signin')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
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
					{
						this.props.jwt && this.props.user
						? <Link href="/user">user</Link>
						: <Signin
								onJwt={this.props.onJwt}
								jwt={this.props.jwt}
								onUser={this.props.onUser}
								user={this.props.user}/>
					}
				</li>
			</ul>
		)
	}
})