var env = require('../../env')

var Signin = require('./Signin')

var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link

import muiThemeable from 'material-ui/styles/muiThemeable';
import MUIAppBar from 'material-ui/AppBar'
import MUIFlatButton from 'material-ui/FlatButton';


module.exports = muiThemeable()(React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	_MUITHEME: this.props.muiTheme,
	render: function () {
		
		var Account = this.props.jwt && this.props.user
		? <MUIFlatButton
				key={Math.random()}
				disableTouchRipple={true}
				hoverColor="transparent"
				style={{color: _MUITHEME.palette.alternateTextColor}}
				href="/user">
				user
			</MUIFlatButton>
		: <Signin
			  key={Math.random()}
				onJwt={this.props.onJwt}
				jwt={this.props.jwt}
				onUser={this.props.onUser}
				user={this.props.user}/>
				
		return (
			<MUIAppBar
				title="PubCenter"
				showMenuIconButton={false}
				onTitleTouchTap={() => {window.location = '/'}}
				children={[
					<MUIFlatButton key={Math.random()} disableTouchRipple={true} hoverColor="transparent" style={{color: _MUITHEME.palette.alternateTextColor}} href="/feed">feeds</MUIFlatButton>,
					<MUIFlatButton key={Math.random()} disableTouchRipple={true} hoverColor="transparent" style={{color: _MUITHEME.palette.alternateTextColor}} href={env.backend+ '/documentation'}>documentation</MUIFlatButton>,
					Account
				]}/>
		)
	}
}))