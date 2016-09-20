var React = require('react')

var Main = require('./components/Main')
var Nav = require('./components/Nav')
var Footer = require('./components/Footer')

module.exports = React.createClass({
  render: function () {
    return (
			<div className="App">
				<Nav/>
				<Main/>
				<Footer/>
			</div>
    )
  }
})