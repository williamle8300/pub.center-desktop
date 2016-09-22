var React = require('react')

var Main = require('./components/Main')
var Nav = require('./components/Nav')
var Footer = require('./components/Footer')

module.exports = React.createClass({
  render: function () {
    return (
			<div className="App" style={AppStyle()}>
				<Nav/>
				<Main/>
				<Footer/>
			</div>
    )
  }
})

function AppStyle() {
	return {
		margin: '0 auto',
		width: '50%',
		fontFamily: 'Helvetica'
	}
}