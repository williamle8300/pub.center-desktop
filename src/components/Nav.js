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
			style={{margin: '1.5rem', color: this.props.muiTheme.palette.alternateTextColor, textDecoration: 'none'}}
			href="/feed">Archived Feeds</Link>
		var DocsLink = <a
			key={Math.random()}
			style={{margin: '1.5rem', color: this.props.muiTheme.palette.alternateTextColor, textDecoration: 'none'}}
			href={env.backend+ '/documentation'}>API</a>
		var AccountLink = this.props.jwt && this.props.user
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
		var Logo = <span style={{cursor: 'pointer'}}><MUILogo style={{color: this.props.muiTheme.palette.alternateTextColor}}/>PubCenter</span>
						
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
			    targetOrigin={{horizontal: 'right', vertical: 'top'}}
			    anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
			    <MUIMenuItem primaryText={FeedsLink} />
			    <MUIMenuItem primaryText={DocsLink} />
			    <MUIMenuItem primaryText={AccountLink} />
				</MUIIconMenu>}/>)
		)
}}))