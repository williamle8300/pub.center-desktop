var React = require('react')
var Request = require('superagent')
var Validator = require('validator')

import MUITextField from 'material-ui/TextField'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIList from 'material-ui/List/List'
import MUIListItem from 'material-ui/List/ListItem'
import MUIAvatar from 'material-ui/Avatar'

var env = require('../../env')

var Input = require('./Input')
var Snackbar = require('./Snackbar')
var Container = require('./Container')
var RouterLink = require('./RouterLink')


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
				<MUITextField
		      hintText={'Filter or paste RSS URL...'}
		      floatingLabelText="Search"
		      floatingLabelFixed={true}
					fullWidth={true}
					onChange={this.searchFeed}/>
				<this.NewFeedButton/>
				<MUIList>
					{
						this.state.feeds.map((feed) => (
							<MUIListItem
								primaryText={feed.name}
								leftAvatar={<MUIAvatar src={feed.favicon} style={{imageRendering: 'pixelated'}}/>}
								onTouchTap={() => window.location = '/feed/' +feed.id}/>
						))
					}
				</MUIList>
			</div>
		)
	},
	componentWillMount: function () {
		
		this.readFeed()
	},
	readFeed: function () {
		
		Request
		.get(env.backend+ '/feed?limit=20')
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({feeds: response.body})
		})
	},
	searchFeed: function (e) {
		
		this.setState({searchTerm: e.target.value}, () => {
		
			Request
			.get(env.backend+ '/feed?limit=20' +(this.state.searchTerm ? '&search=' +this.state.searchTerm : ''))
			.end((err, response) => {
		
				if (err) throw err
		
				return this.setState({feeds: response.body})
			})
		})
	},
	NewFeedButton: function () {

		if (!this.state.searchTerm || !Validator.isURL(this.state.searchTerm, {require_protocol: true})) return null
		
		return (
			<div>
				Feed was not found...    
				<MUIRaisedButton label="Archive this RSS feed" onTouchTap={this.createFeed.bind(this, this.state.searchTerm)}/>
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