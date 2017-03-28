var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'

module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		style: React.PropTypes.object,
	},
	render: function () {

		var defaultStyle = {
			fontFamily: this.props.muiTheme.fontFamily,
			color: this.props.muiTheme.palette.primary1Color
		}
		
		return (
			<h1 style={Object.assign({}, defaultStyle, this.props.style)}>
				{this.props.children}
			</h1>
		)
	}
}))