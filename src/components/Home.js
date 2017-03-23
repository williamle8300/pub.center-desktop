var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'


module.exports = MUIThemeable()(React.createClass({
  render: function () {
    return (
			<div style={this.style1()}>
				<div style={{padding: this.props.muiTheme.spacing.desktopGutter}}>PubCenter is a non-profit organization specialized in building archives of historical records of RSS news data. Access to this data will always be completely free-of-charge to the public (no signup is required). We believe in the marketplace of ideas, and want to facilitate dialogue. We believe this can be accomplished simply by 1)archiving ideas chronologically and 2)making access free to everyone.</div>
			</div>
    )
  },
	style1: function () {
		return {
			height: '100vh',
			background: this.props.muiTheme.palette.primary2Color,
		}
	},
}))