var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link

var Signin = require('./Signin')


module.exports = React.createClass({
	propTypes: {
		onJwt: React.PropTypes.func,
		jwt: React.PropTypes.string,
		onUser: React.PropTypes.func,
		user: React.PropTypes.object,
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
						this.props.jwt
						? <Link href="/account">account</Link>
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