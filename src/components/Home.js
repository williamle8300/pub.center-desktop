var React = require('react')


module.exports = React.createClass({
  render: function () {
    return (
			<div>
	    	<h1>pub.center</h1>
				<p>pub.center provides a free REST interface for archived rss data.</p>
				<p>we refresh 4/day [modal explaining good/bad types of rss feeds. this</p> approach satisfies the majority of popular rss feeds. rss feeds that are high volume should not rely on pub.center for data integrity (examples of this include reddit rss feeds, youtube rss feeds, twitter rss feeds)]
				<p>to support us, consider using our push notifications. It is a utility</p> service.
				<p>we have email [show example email], we have sms [show example sms on</p> iPhone], we have api [show example json]
				<p>we charge: [prices]</p>
				<p>for push notifications, you have a free $1 credit each month, and pub.center</p> will only "post" a bill if it exceeds $1.
				<p>[breaks for each "channel"]</p>
				<p>please reconcile your bills once they exceed $10. </p>
			</div>
    )
  }
})