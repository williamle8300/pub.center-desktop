var env = require('../../env')

var Signin = require('./Signin')

var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIAppBar from 'material-ui/AppBar'
import MUIMenuItem from 'material-ui/MenuItem'
import MUIIconMenu from 'material-ui/IconMenu'
import MUILogo from 'material-ui/svg-icons/content/select-all'
import MUIIconButton from 'material-ui/IconButton'
import MUIDotIcon from 'material-ui/svg-icons/navigation/more-vert';




module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {
		
		var FeedsLink = <Link
			key={Math.random()}
			style={this.style1()}
			href="/feed">Archived Feeds</Link>
		var DocsLink = <a
			key={Math.random()}
			style={this.style1()}
			href={env.backend+ '/documentation'}>API</a>
		var AccountLink = this.props.jwt && this.props.user
		? <Link
				key={Math.random()}
				style={this.style1()}
				href="/user">
				Account
			</Link>
		: <Link
				key={Math.random()}
				href="/signin"
				style={this.style1()}>
				Signin
			</Link>
		var Logo = <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}><MUILogo style={{color: this.props.muiTheme.palette.alternateTextColor}}/>PubCenter</div>
						
		return (
			this.props.width > 1000
			? (<MUIAppBar
				title={Logo}
				showMenuIconButton={false}
				onTitleTouchTap={() => {window.location = '/'}}
				children={[
					FeedsLink,
					DocsLink,
					AccountLink
				]}/>)
		  : (<MUIAppBar
				title={Logo}
				showMenuIconButton={false}
				onTitleTouchTap={() => {window.location = '/'}}
				iconElementRight={<MUIIconMenu
			    iconButtonElement={ <MUIIconButton><MUIDotIcon /></MUIIconButton> }
			    targetOrigin={{vertical: 'top', horizontal: 'right'}}
			    anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
			    <MUIMenuItem primaryText={FeedsLink} />
			    <MUIMenuItem primaryText={DocsLink} />
			    <MUIMenuItem primaryText={AccountLink} />
				</MUIIconMenu>}/>)
		)
	},
	style1: function () {
		return {
			display: 'inline-block',
			margin: this.props.width > 1000 ? '1.5rem' : '0',
			width: this.props.width > 1000 ? 'initial' : '100%',
			color: this.props.width > 1000 ? this.props.muiTheme.palette.alternateTextColor : this.props.muiTheme.palette.textColor,
			textDecoration: 'none'
		}
	},
}))