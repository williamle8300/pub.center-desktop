var React = require('react')
var Request = require('superagent')
var Router = require('react-router-component')
var Link = Router.Link
var {InputFilter, FilterResults} = require('react-fuzzy-filter').default()

var config = require('../../config')


module.exports = React.createClass({
	getInitialState: function () {
		return {
			feeds: []
		}
	},
	render: function () {
		return (
			<div>
				<InputFilter debounceTime={500}/>
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

		Request
		.get(config.backend+ '/feed')
		.end(function (err, response) {
			
			if (err) {
				throw err
			}
			
			this.setState({feeds: response.body})
		}.bind(this))
	}
})