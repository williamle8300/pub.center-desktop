var _ = require('lodash')
var React = require('react')


module.exports = React.createClass({
	propTypes: {
		children: React.PropTypes.element.isRequired,
		isVisible: React.PropTypes.bool.isRequired,
		disableEscape: React.PropTypes.bool,
		style: React.PropTypes.object,
		onClose: React.PropTypes.func,
	},
	getDefaultProps: function () {
		return {
			disableEscape: false
		}
	},
	render: function () {
		return (
			<div className="Modal" onClick={this.props.onClose} style={styleA(null, this.props)}>
				{this.props.children}
			</div>
		)
	},
	componentDidMount: function () {
		document.addEventListener('keydown', this.onEscape, false)
	},
	onEscape: function (e) {
		
		if (
			e.keyCode === 27
			&& !this.props.disableEscape
			&& this.props.onClose
			&& typeof this.props.onClose === 'function'
		) {
			this.props.onClose()
		}
	}
})

function styleA(state, props) {

	var genericStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
		display: props.isVisible ? 'flex' : 'none',
		alignItems: 'center',
		justifyContent: 'center',
    width: '100%',
    height: '100%',
		background: 'rgba(0, 0, 0, 0.3333)',
	}
	
	return _.merge(genericStyle, props.style)
}
// closebutton.
// content.
// listen for escape.