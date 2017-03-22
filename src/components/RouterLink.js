var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link

import MUIThemeable from 'material-ui/styles/muiThemeable'


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		href: React.PropTypes.string.isRequired,
		style: React.PropTypes.object,
	},
	render: function () {

		var defaultStyle = {
			color: this.props.muiTheme.palette.textColor,
		}
		
		return (
			<Link href={this.props.href} style={Object.assign({}, defaultStyle, this.props.style)}>
				{this.props.children}
			</Link>
		)
	}
}))