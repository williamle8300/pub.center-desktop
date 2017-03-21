var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'

module.exports = MUIThemeable()(React.createClass({
	render: function () {

		var defaultStyle = {
			fontFamily: this.props.muiTheme.fontFamily,
		}
		
		return (
			<h1 style={Object.assign({}, defaultStyle, this.props.style)}>
				{this.props.children}
			</h1>
		)
	}
}))