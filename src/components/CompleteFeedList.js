var env = require('../../env')
var styleguide = require('../../styleguide')

var Input = require('./Input')
var Snackbar = require('./Snackbar')

var React = require('react')
var Request = require('superagent')
var Router = require('react-router-component')
var Link = Router.Link
var Validator = require('validator')


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
					<Input
						placeholder={'Type to filter...'}
						onChange={this.searchFeed}/>
					<this.CreateFeedButton/>
				</div>
				{
					this.state.feeds.map((feed) => (
						<div key={feed.id} style={{display: 'flex', flexDirection: 'row', padding: styleguide().padding}}>
							<Link href={'/feed/' +feed.id}>
									<img src={feed.favicon} width={16} alt={feed.name+ ' favicon'}/>
									{feed.name}
							</Link>
						</div>
					))
				}
			</div>
		)
	},
	componentWillMount: function () {
		
		this.readFeed()
	},
	readFeed: function () {
		
		Request
		.get(env.backend+ '/feed?limit=10')
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({feeds: response.body})
		})
	},
	searchFeed: function (e) {
		
		this.setState({searchTerm: e.target.value}, () => {
		
			Request
			.get(env.backend+ '/feed?limit=10' +(this.state.searchTerm ? '&search=' +this.state.searchTerm : ''))
			.end((err, response) => {
		
				if (err) throw err
		
				return this.setState({feeds: response.body})
			})
		})
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