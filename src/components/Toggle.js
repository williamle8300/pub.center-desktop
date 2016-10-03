var React = require('react')
var ReactToggle = require('react-toggle')
import 'react-toggle/style.css'


module.exports = React.createClass({
	render: function () {
		return (
			<ReactToggle {...this.props}/>
		)
	}
})