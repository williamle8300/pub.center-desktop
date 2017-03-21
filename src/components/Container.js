var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'


module.exports = MUIThemeable()(React.createClass({
	render: function () {

		var defaultStyle = {
			// fontFamily: this.props.muiTheme.fontFamily,
			padding: this.props.muiTheme.spacing.desktopGutter
		}
		
		return (
			<div style={Object.assign({}, defaultStyle, this.props.style)}>
				{this.props.children}
			</div>
		)
	}
}))