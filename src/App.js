var env = require('../env')

var JwtDecode = require('jwt-decode')
var Request = require('superagent')
var React = require('react')

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

var Main = require('./components/Main')
var Nav = require('./components/Nav')
var Footer = require('./components/Footer')


module.exports = React.createClass({
	getInitialState: function () {
		return {
			jwt: null,
			user: null
		}
	},
  render: function () {
		var MUITheme = {
			fontFamily: '"Monda", sans-serif',
			palette: {
				// primary1Color: '#0097a7',
				// primary2Color: '#0097a7',
				// primary3Color: '#757575',
				// accent1Color: '#ff4081',
				// accent2Color: '#f50057',
				// accent3Color: '#ff80ab',
				// textColor: 'rgba(255, 255, 255, 1)',
				// secondaryTextColor: 'rgba(255, 255, 255, 0.7)',
				alternateTextColor: '#fff',
				// borderColor: 'rgba(255, 255, 255, 0.3)',
				// canvasColor: '#000',
				// clockCircleColor: 'rgba(255, 255, 255, 0.12)',
				// disabledColor: 'rgba(255, 255, 255, 0.3)',
				// pickerHeaderColor: 'rgba(255, 255, 255, 0.12)'
			}
		}
		console.log(1, getMuiTheme(MUITheme));
    return (
		  <MuiThemeProvider muiTheme={getMuiTheme(MUITheme)}>
				<div className="App">
					<Nav
						onJwt={this.onJwt}
						jwt={this.state.jwt}
						onUser={this.onUser}
						user={this.state.user}/>
					<Main
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

		this.establishSession()
	},
	componentDidUpdate: function (prevProps, prevState) {
		
		//fresh jwt
		if (this.state.jwt && prevState.jwt !== this.state.jwt) {

			this.readUser()
		}
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
})