var React = require('react')

var enforceVanillaHtml = require('../util/enforce-vanilla-html')


module.exports = React.createClass({
	
	propTypes: {
		articles: React.PropTypes.array.isRequired,
	},
	
	render: function () {
		return (
			<div>
				{
					this.props.articles.map((article) => {						
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
			</div>
		)
	}
})