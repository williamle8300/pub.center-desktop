var env = require('../../env')

var Signin = require('./Signin')

var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIAppBar from 'material-ui/AppBar'
import MUILogo from 'material-ui/svg-icons/content/select-all'


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	// _MUITHEME: this.props.muiTheme, //React Context
	render: function () {
		
		var Account = this.props.jwt && this.props.user
		? <Link
				key={Math.random()}
				style={{margin: '1.5rem', color: this.props.muiTheme.palette.alternateTextColor, textDecoration: 'none'}}
				href="/user">
				Account
			</Link>
		: <Signin
			  key={Math.random()}
				onJwt={this.props.onJwt}
				jwt={this.props.jwt}
				onUser={this.props.onUser}
				user={this.props.user}/>
				
		return (
			<MUIAppBar
				title={<span style={{cursor: 'pointer'}}><MUILogo style={{color: this.props.muiTheme.palette.alternateTextColor}}/>PubCenter</span>}
				showMenuIconButton={false}
				onTitleTouchTap={() => {window.location = '/'}}
				children={[
					<Link
						key={Math.random()}
						style={{margin: '1.5rem', color: this.props.muiTheme.palette.alternateTextColor, textDecoration: 'none'}}
						href="/feed">Indexed Feeds</Link>,
					<a
						key={Math.random()}
						style={{margin: '1.5rem', color: this.props.muiTheme.palette.alternateTextColor, textDecoration: 'none'}}
						href={env.backend+ '/documentation'}>API</a>,
					Account
				]}/>
		)
	}
}))