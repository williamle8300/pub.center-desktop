var env = require('../../env')

var Signin = require('./Signin')

var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link
import Styled from 'styled-components'

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

		var Logo = <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}><MUILogo style={{color: this.props.muiTheme.palette.alternateTextColor}}/>PubCenter</div>
		var NavLink = Styled(Link)`
			display: inline-block;
			margin: ${this.props.width > 1000 ? '1.5rem' : '0'};
			width: ${this.props.width > 1000 ? 'initial' : '100%'};
			color: ${this.props.width > 1000 ? this.props.muiTheme.palette.alternateTextColor : this.props.muiTheme.palette.textColor};
			text-decoration: none;
			&:hover {
				text-decoration: underline
			}
		`
		var DocsLink = Styled.a`
			display: inline-block;
			margin: ${this.props.width > 1000 ? '1.5rem' : '0'};
			width: ${this.props.width > 1000 ? 'initial' : '100%'};
			color: ${this.props.width > 1000 ? this.props.muiTheme.palette.alternateTextColor : this.props.muiTheme.palette.textColor};
			text-decoration: none;
			&:hover {
				text-decoration: underline
			}
		`
		var isUserAuthenticated = this.props.jwt && this.props.user


		return (
			this.props.width > 1000
			? (<MUIAppBar
				title={Logo}
				showMenuIconButton={false}
				onTitleTouchTap={() => {window.location = '/'}}
				children={[
					<NavLink key={Math.random()} href="/feed">Archived Feeds</NavLink>,
					<DocsLink key={Math.random()} href={env.backend+ '/documentation'}>API</DocsLink>,
					isUserAuthenticated ? <NavLink key={Math.random()} href="/user">Account</NavLink> : <NavLink key={Math.random()} href="/signin">Signin</NavLink>
				]}
				style={this.style2()}/>)
		  : (<MUIAppBar
				title={Logo}
				showMenuIconButton={false}
				onTitleTouchTap={() => {window.location = '/'}}
				iconElementRight={<MUIIconMenu
			    iconButtonElement={ <MUIIconButton><MUIDotIcon /></MUIIconButton> }
			    targetOrigin={{vertical: 'top', horizontal: 'right'}}
			    anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
			    <MUIMenuItem primaryText={<NavLink href="/feed">Archived Feeds</NavLink>} />
			    <MUIMenuItem primaryText={<DocsLink href={env.backend+ '/documentation'}>API</DocsLink>} />
			    <MUIMenuItem primaryText={isUserAuthenticated ? <NavLink href="/user">Account</NavLink> : <NavLink href="/signin">Signin</NavLink>} />
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
	style2: function () {
		return {
			paddingRight: window.innerWidth/7,
			paddingLeft: window.innerWidth/7
		}
	}
}))
