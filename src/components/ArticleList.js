var React = require('react')
var Request = require('superagent')

var config = require('../../config')

var enforceVanillaHtml = require('../util/enforce-vanilla-html')


module.exports = React.createClass({
	
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
			<div>
				{
					this.state.articles.map(function (article) {						
						return (
							<article key={article.id} style={{clear: 'both'}}>
								<header>
									<h3>
										<div>
											<a href={article.url}>{article.title}</a>
										</div>
									</h3>
									<div>{article.author}</div>
									<div>{new Date(article.date).toDateString()}</div>
								</header>
								<div dangerouslySetInnerHTML={{__html: enforceVanillaHtml(article.description)}}/>
							</article>
						)
					})
				}
				<button onClick={this.getArticles}>Show More</button>
			</div>
		)
	},
	
	componentDidMount: function () {
		
		this.getArticles()
	},
	
	getArticles: function () {

		Request
		.get(config.backend+ '/article?feed='  +encodeURIComponent(this.props._feed_)+ '&page=' +this.state.page)
		.end(function (err, response) {

			if (err) {
				throw err
			}
			
			this.setState({
				articles: this.state.articles.concat(response.body),
				page: ++this.state.page
			})
		}.bind(this))
	}
})