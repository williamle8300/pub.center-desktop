var React = require('react')

var Modal = require('./Modal')


module.exports = React.createClass({
	propTypes: {
		onJwt: React.PropTypes.func,
		jwt: React.PropTypes.string,
		onUser: React.PropTypes.func,
		user: React.PropTypes.object,
	},
	getInitialState: function () {
		return {
			modalVisible: false
		}
	},
	render: function () {
		return (
			<div>
				<a href="#" onClick={() => this.setState({modalVisible: true})}>signin</a>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal} style={{}}>
					<div style={styleA()}>
						<button onClick={this.closeModal}>X</button>
						<div>cool</div>
					</div>
				</Modal>
			</div>
		)
	},
	closeModal: function () {
		
		this.setState({modalVisible: false})
	}
})

function styleA() {
	return {
		maxWidth: '50%',
		background: 'white'
	}
}
/*
	open modal:
		login => got jwt => save to LS
			get user using jwt => got user => save to LS
*/