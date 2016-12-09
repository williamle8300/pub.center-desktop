var React = require('react')


module.exports = React.createClass({
	propTypes: {
		placeholder: React.PropTypes.string,
		onChange: React.PropTypes.func
	},
	defaultProps: {
		placeholder: 'Input'
	},
	render: function () {
		return (
			<input
				placeholder={this.props.placeholder}
				onChange={this.props.onChange}
				style={this.style()}/>
		)
	},
	style: function () {
		return {
	    borderRadius: '0.25rem',
	    border: '1px solid',
	    padding: '0.5rem',
	    fontSize: '1rem',
		}
	}
})