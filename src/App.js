var env = require('../env')

var JwtDecode = require('jwt-decode')
var Request = require('superagent')
var React = require('react')

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MUIThemeable from 'material-ui/styles/muiThemeable'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

var Main = require('./components/Main')
var Nav = require('./components/Nav')
var Footer = require('./components/Footer')

import { injectGlobal } from 'styled-components'

injectGlobal`
	@font-face {
	  font-family: 'blokk';
	  src: url('./fonts/BLOKKNeue-Regular.otf') format('opentype');
	}
`

module.exports = MUIThemeable()(React.createClass({
	getInitialState: function () {
		return {
			width: 0,
			height: 0,
			jwt: null,
			user: null,
		}
	},
	_theme: {
		fontFamily: '"Monda", sans-serif',
		palette: {
			primary1Color: '#e29332',
			primary2Color: '#fffaf3',
			primary3Color: '#8e6a3d',
			// accent1Color: '#e0881a',
			// accent2Color: '#f50057',
			// accent3Color: '#ff80ab',
			// secondaryTextColor: 'rgba(255, 255, 255, 0.7)',
			textColor: 'rgba(0, 0, 0, 0.6)',
			alternateTextColor: '#fff',
			// borderColor: 'rgba(255, 255, 255, 0.3)',
			canvasColor: '#f5f5f5',
			// clockCircleColor: 'rgba(255, 255, 255, 0.12)',
			// disabledColor: 'rgba(255, 255, 255, 0.3)',
			// pickerHeaderColor: 'rgba(255, 255, 255, 0.12)'
		}
	},
  render: function () {
    return (
		  <MuiThemeProvider muiTheme={getMuiTheme(this._theme)}>
				<div className="App" style={{height: '100%', backgroundColor: this._theme.palette.primary3Color, overflow: 'auto'}}>
					<Nav
						width={this.state.width}
						height={this.state.height}
						onJwt={this.onJwt}
						jwt={this.state.jwt}
						onUser={this.onUser}
						user={this.state.user}/>
					<Main
						width={this.state.width}
						height={this.state.height}
						jwt={this.state.jwt}
						user={this.state.user}
						onJwt={this.onJwt}
						onUser={this.onUser}/>
					<Footer/>
				</div>
			</MuiThemeProvider>
    )
  },
	componentDidMount: function () {

		//initialize Browser dimensions
		window.onload = () => {
			this.setState({width: window.innerWidth, height: window.innerHeight})
		}

		this.listenToResize()
		this.establishSession()
	},
	componentDidUpdate: function (prevProps, prevState) {

		//fresh jwt
		if (this.state.jwt && prevState.jwt !== this.state.jwt) {

			this.readUser()
		}
	},
	listenToResize: function () {

		function customThrottledListener (type, eventName) {

		  var running = false

		  window.addEventListener(type, () => {

		    if (running) return

		    running = true

		    requestAnimationFrame(() => {

		       window.dispatchEvent(new CustomEvent(eventName))
		       running = false
		    })
		  })
		}

		customThrottledListener('resize', 'optimizedResize')

		window.addEventListener('optimizedResize', (e) => {

			this.setState({width: window.innerWidth, height: window.innerHeight})
		})
	},
	establishSession: function () {

		var expirationMs
		var expirationDate

		if (!JSON.parse(localStorage.jwt)) return

		//it's weird but jwt spec defines seconds, not milliseconds for expiration
		expirationMs = JwtDecode(JSON.parse(localStorage.jwt)).exp * 1000
		expirationDate = new Date(expirationMs)

		//exp passed?
		if (expirationDate < new Date()) {

			localStorage.removeItem('jwt')

			return this.onJwt(null)
		}

		//jwt is fresh. auto-renew it!
		else {

			Request
			.put(env.backend+ '/jwt')
			.send({jwt: JSON.parse(localStorage.jwt)})
			.end((err, response) => {

				if (err) throw err

				if (!response.text) return this.onJwt(null)

				return this.onJwt(response.text)
			})
		}
	},
	readUser: function () {

		Request
		.get(env.backend+ '/user/' +JwtDecode(this.state.jwt).id)
		.set({Authorization: 'Bearer ' +this.state.jwt})
		.end((err, response) => {

			if (err) throw err

			return this.onUser(response.body)
		})
	},
	onJwt: function (jwt, callback) {

		localStorage.jwt = JSON.stringify(jwt)

		return this.setState({jwt: jwt}, callback)
	},
	onUser: function (user, callback) {

		return this.setState({user: user}, callback)
	}
}))
