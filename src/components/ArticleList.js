var React = require('react')
var Request = require('superagent')
import ReactCollapsible from 'react-collapsible';

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIList from 'material-ui/List/List'
import MUIListItem from 'material-ui/List/ListItem'
import MUIPaper from 'material-ui/Paper'
import MUIDivider from 'material-ui/Divider';

var env = require('../../env')

var Container = require('./Container')
var EnforceVanillaHtml = require('../util/enforce-vanilla-html')


module.exports = MUIThemeable()(React.createClass({
	
	propTypes: {
		_feed_: React.PropTypes.string.isRequired,
	},
	
	getInitialState: function () {
		return {
			articles: [],
			page: 1
		}
	},
	
	render: function () {
		return (
			<div style={{margin: '1rem 0 0'}}>
				{
					this.state.articles.map((article) => {						
						return (
							<ReactCollapsible key={article.id} trigger={<MUIPaper><Container style={{cursor: 'pointer'}}>{article.title}</Container></MUIPaper>}>
								<Container style={{background: this.props.muiTheme.palette.primary3Color}}>
									<h3><a href={article.url}>{article.title}</a>  {Date(article.date)}</h3>
									<div dangerouslySetInnerHTML={{__html: EnforceVanillaHtml(article.description)}}/>
								</Container>
							</ReactCollapsible>
						)
					})
				}
				<br/>
				<MUIRaisedButton fullWidth label="Show More" onTouchTap={this.getArticles}/>
			</div>
		)
	},
	
	componentDidMount: function () {
		
		this.getArticles()
	},
	
	getArticles: function () {

		Request
		.get(env.backend+ '/article?feed='  +encodeURIComponent(this.props._feed_)+ '&page=' +this.state.page)
		.end((err, response) => {

			if (err) throw err
			
			return this.setState({
				articles: this.state.articles.concat(response.body),
				page: ++this.state.page
			})
		})
	}
}))