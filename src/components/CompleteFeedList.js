var React = require('react')
var Request = require('superagent')
var Router = require('react-router-component')
var Link = Router.Link
var {InputFilter, FilterResults} = require('react-fuzzy-filter').default()
var Validator = require('validator')

var env = require('../../env')

var Snackbar = require('./Snackbar')


module.exports = React.createClass({
	getInitialState: function () {
		return {
			feeds: [],
			searchTerm: '',
			snacks: []
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
		.get(env.backend+ '/feed?limit=1000000000')
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({feeds: response.body})
		})
	},
	updateSearchTerm: function (searchTerm) {
		
		//this is a hack
		//react-fuzzy-filter automatically
		//sets searchTerm to undefined
		//for some odd reason
		//so gotta undo that erroneous behavior
		if (!searchTerm) {
			return this.setState({searchTerm: this.getInitialState().searchTerm})
		}

		return this.setState({searchTerm: searchTerm})
	},
	CreateFeedButton: function () {

		if (!this.state.searchTerm || !Validator.isURL(this.state.searchTerm, {require_protocol: true})) return null
		
		return (
			<div>
				That looks like an url
				<button onClick={this.createFeed.bind(this, this.state.searchTerm)}>Add this feed: {this.state.searchTerm}</button>
				<Snackbar
					snacks={this.state.snacks}
					onRemoveSnack={(key) => {
						
						this.setState({snacks: this.state.snacks.filter((snacks) => {
							return snacks.key !== key
						})})
					}}/>
			</div>
		)
	},
	createFeed: function (url) {
				
		Request
		.post(env.backend+ '/feed')
		.send({url: url})
		.end((err, response) => {
			
			if (err) {
				
				return this.setState({
					snacks: this.state.snacks.concat({
						message: 'Not a feed url',
						key: Date.now(),
						dismissAfter: 2000
					})
				})
			}
			
			return this.setState({
				snacks: this.state.snacks.concat({
					message: 'Feed added',
					key: Date.now(),
					dismissAfter: 2000
				})
			}, this.readFeed)
		})
	}
})