var React = require('react')
var SanitizeHtml = require('sanitize-html')

module.exports = React.createClass({
	
	propTypes: {
		articles: React.PropTypes.array.isRequired,
	},
	
	render: function () {
		return (
			<div>
				{
					this.props.articles.map((article) => {
						return (<p key={article.id} dangerouslySetInnerHTML={{__html: SanitizeHtml(article.description, {allowedTags: SanitizeHtml.defaults.allowedTags.concat([ 'img' ])})}}/>)
					})
				}
			</div>
		)
	}
})