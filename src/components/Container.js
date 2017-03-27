var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'


module.exports = MUIThemeable()(React.createClass({
	render: function () {

		var defaultStyle = {
			padding: this.props.muiTheme.spacing.desktopGutter,
			backgroundColor: this.props.muiTheme.palette.canvasColor,
		}
		
		return (
			<div style={Object.assign({}, defaultStyle, this.props.style)}>
				{this.props.children}
			</div>
		)
	}
}))