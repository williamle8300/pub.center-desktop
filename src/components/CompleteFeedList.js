var Notification = require('react-notification').Notification
var React = require('react')
var Request = require('superagent')
var Router = require('react-router-component')
var Link = Router.Link
var {InputFilter, FilterResults} = require('react-fuzzy-filter').default()
var Validator = require('validator')

var backend = require('../../config').backend


module.exports = React.createClass({
	getInitialState: function () {
		return {
			feeds: [],
			searchTerm: '',
			showSnackbar: false,
			snackBarMessage: ''
		}
	},
	render: function () {
		return (
			<div>
				<div>
					<InputFilter debounceTime={500} inputProps={{placeholder: 'Search...'}} onChange={this.updateSearchTerm}/>
					<this.CreateFeedButton/>
				</div>
				<FilterResults
					items={this.state.feeds}
					fuseConfig={{keys: ['name', 'url']}}
					renderItem={function (item, idx) {
						return (
							<div key={item.id} style={{margin: '1em 0'}}>
								<Link href={'/feed/' +item.id}>{item.name ? item.name : item.url}</Link>
								<br/>
								<small>{item.url}</small>
							</div>
						)
					}}/>
			</div>
		)
	},
	componentWillMount: function () {
		
		this.readFeed()
	},
	readFeed: function () {
		
		Request
		.get(backend+ '/feed')
		.end((err, response) => {
			
			if (err) throw err
			
			this.setState({feeds: response.body})
			return
		})
	},
	updateSearchTerm: function (searchTerm) {
		
		//this is a hack
		//react-fuzzy-filter auto-changes
		//searchTerm to undefined
		//for some odd reason
		if (!searchTerm) {
			this.setState({searchTerm: this.getInitialState().searchTerm})
		}

		this.setState({searchTerm: searchTerm})
	},
	CreateFeedButton: function () {

		if (!this.state.searchTerm || !Validator.isURL(this.state.searchTerm)) return null
		
		return (
			<div>
				That looks like an url
				<button onClick={this.createFeed.bind(this, this.state.searchTerm)}>Add this feed: {this.state.searchTerm}</button>
				<Notification
					isActive={this.state.showSnackbar}
					message={this.state.snackBarMessage}
					onDismiss={() => {this.setState({showSnackbar: false})}}/>
			</div>
		)
	},
	createFeed: function (url) {
		
		Request
		.post(backend+ '/feed')
		.send({url: url})
		.end((err, response) => {
			
			if (err) {
				
				if (response.status === 400) {

					return this.setState({
						showSnackbar: true,
						snackBarMessage: 'Invalid RSS url'
					})
				}
				
				throw err
			}
			
			return this.setState({
				showSnackbar: true,
				snackBarMessage: 'Feed was added.'
			}, this.readFeed)
		})
	}
})