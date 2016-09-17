var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link
var Locations = Router.Locations
var Location = Router.Location
var NotFound = Router.NotFound

var Doc = require('./components/Doc')
var Feed = require('./components/Feed')
var Home = require('./components/Home')
var Page404 = require('./components/Page404')


module.exports = React.createClass({
  render: function () {
    return (
			<div>
				<ul>
					<li>
						<Link href="/">home</Link>
					</li>
					<li>
						<Link href="/doc">doc</Link>
					</li>
					<li>
						<Link href="/feed">feed</Link>
					</li>
				</ul>
				<Locations>
					<Location path="/" handler={Home} />
					<Location path="/feed" handler={Feed} />
					<Location path="/doc" handler={Doc} />
					<NotFound handler={Page404} />
				</Locations>
			</div>
    )
  }
})