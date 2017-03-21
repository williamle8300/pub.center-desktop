var React = require('react')

import MUIDialog from 'material-ui/Dialog';


module.exports = React.createClass({
	propTypes: {
		children: React.PropTypes.element.isRequired,
		isOpen: React.PropTypes.bool.isRequired,
		style: React.PropTypes.object,
		onClose: React.PropTypes.func.isRequired,
		title: React.PropTypes.string,
		actions: React.PropTypes.node,
	},
	render: function () {
		return (
			<MUIDialog
				title={this.props.title}
				actions={this.props.actions}
        open={this.props.isOpen}
        onRequestClose={this.props.onClose}
				style={Object.assign({}, this.props.style)}>
        {this.props.children}
      </MUIDialog>
		)
	},
})