var Request = require('superagent')
var React = require('react')

import MUITableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import MUIFlatButton from 'material-ui/FlatButton'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIToggle from 'material-ui/Toggle'
import MUITextField from 'material-ui/TextField'

var env = require('../../env')

var Modal = require('./Modal')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	getInitialState: function () {
		return {
			endpoint: '',
			apiHeadersKey: '',
			apiHeadersValue: '',
			modalVisible: false
		}
	},
	render: function () {
		return (
			<MUITableHeaderColumn style={{textAlign: 'center'}}>
				<MUIFlatButton secondary  label="API" onTouchTap={() => {return this.setState({modalVisible: true})}}/>
				<br/>
				<br/>
				<Modal isOpen={this.state.modalVisible} onClose={this.closeModal} actions={[<MUIFlatButton onTouchTap={this.closeModal} label="Cancel"/>, <MUIFlatButton primary label="Submit" onTouchTap={this.update}/>]}>
					<div onClick={(e) => e.stopPropagation()}>
						<MUITextField
							type="text"
							value={this.state.endpoint}
							hintText={this.props.user.pushConfig.channelConfig.api.endpoint || 'http://example.com'}
							floatingLabelText="Your Endpoint"
							floatingLabelFixed={true}
							onChange={this.onChangeEndpoint}/>
						{/*
						<br/>
												<MUITextField
													type="text"
													value={this.state.apiHeadersKey}
													hintText={this.props.user.pushConfig.channelConfig.api.headers.key || 'a1b2'}
													floatingLabelText="Header Value"
													floatingLabelFixed={true}
													onChange={this.onChangeApiHeadersKey}/>
												<br/>
												<MUITextField
													type="text"
													value={this.state.apiHeadersValue}
													hintText={this.props.user.pushConfig.channelConfig.api.headers.value || 'z0y9'}
													floatingLabelText="Header Key"
													floatingLabelFixed={true}
													onChange={this.onChangeApiHeadersValue}/>*/
						}
						<br/>
						<small><sup>*</sup>POST request will be sent to your endpoint with a JSON Article object. See example:</small>
						<pre style={this.style1()}>
							{`{
 "archiveDate": "2017-03-28T01:52:19.350Z",
 "author": "Kerry Sheehan",
 "categories": [
 	"Legislative Analysis",
 	"Fixing Copyright? The 2013-2016 Copyright Review Process"
 ],
 "date": "2017-03-28T01:26:39.000Z",
 "description": "<div class=\"field field-name-body field-type-text-with-summary field-label-hidden\"><div class=\"field-items\"><div class=\"field-item even\"><p>After three years of discussing changes to copyright law, Congress’s first bill is a strange one. House and Senate Judiciary Committee leaders have <a href=\"https://judiciary.house.gov/press-release/goodlatte-conyers-grassley-feinstein-leahy-call-quick-action-legislation-provide-selection-process-register-copyrights/\">introduced a bill</a> that would radically change the way the Register of Copyrights is picked – taking the process out of the hands of the Librarian of Congress and putting it into the hands of Congress and the President. That sounds like a pretty technical move, but it could have real consequences for future innovation and creativity.  Let’s break it down.</p>\n<p>As it stands now, the Register is appointed by the Librarian of Congress, and serves under her direction and oversight.  The <a href=\"https://judiciary.house.gov/wp-content/uploads/2017/03/SLW_502_xml.pdf?utm_source=House+Judiciary+Committee+Press+Releases&amp;utm_campaign=0a41230351-EMAIL_CAMPAIGN_2017_03_23&amp;utm_medium=email&amp;utm_term=0_df41eba8fd-0a41230351-101202693\">“Register of Copyrights Selection and Accountability Act of 2017”</a> would require that the head of the Copyright Office be appointed by the President and confirmed by the Senate, and would authorize the President to remove the Register. This would make the Register’s appointment process more democratic – but also more a captive of special interests.</p>\n<p>The Copyright Office is supposed to focus on a pretty mundane but important job: registering copyrightable works. Like the entities such as the Congressional Research Service and the GAO, the Copyright Office is also <a href=\"https://www.law.cornell.edu/uscode/text/17/701\">charged with</a> providing advice to Congress, and “information and assistance” to other federal government entities.  It is not, however, responsible for making or officially applying copyright law except in very narrow circumstances (like deciding whether a work qualifies for registration). Instead, the responsibility for setting the nation’s copyright policy rests with Congress.</p>\n<p>In the past decade, however, the Copyright Office has played an increasingly central role in policymaking – and <a href=\"https://www.publicknowledge.org/documents/captured-systemic-bias-at-the-us-copyright-office-1\">it has not been a neutral advocate</a>. The Copyright Office has repeatedly put forward policy proposals and legal analyses that have tended to favor the interests of a particular segment of copyright owners (particularly major media and entertainment companies) over other constituencies. For example, one former Register famously stated, <a href=\"https://www.techdirt.com/articles/20120330/09445718303/how-can-you-be-register-copyrights-if-you-dont-even-understand-copyrights-most-basic-purpose.shtml\">“[c]opyright is for the author first and the nation second.”</a>  Under her leadership, the Office <a href=\"https://www.publicknowledge.org/news-blog/blogs/the-growing-list-of-how-the-copyright-office-has-failed-us\">supported</a> the disastrous <a href=\"https://www.eff.org/issues/coica-internet-censorship-and-copyright-bill\">Stop Online Piracy Act (SOPA)</a>. And last year, the Office worked <a href=\"https://www.eff.org/deeplinks/2016/10/newly-released-documents-show-hollywood-influenced-copyright-offices-comments-set\">closely and quietly</a> with major entertainment companies to derail the FCC’s effort to improve competition and consumer choice in cable set-top boxes. The Office also pushed through an unpopular <a href=\"https://www.eff.org/deeplinks/2016/11/copyright-office-sets-trap-unwary-website-owners\">rule change</a> that puts many small website owners at risk of losing access to copyright law’s safe harbors for intermediaries. More and more people feel the consequences of this bias at the Copyright Office, as <a href=\"https://www.eff.org/deeplinks/2017/03/another-loss-broadcast-tv-streaming-and-dangerous-shift-decision-making-power\">some appellate courts</a> have looked to the Office to decide close and critical legal questions.  And thanks to the <a href=\"https://www.eff.org/deeplinks/2014/11/eff-librarian-congress-let-car-owners-look-under-hood\">Digital Millennium Copyright Act</a>, the Copyright Office also plays a central role in shaping our technological future.</p>\n<p>The Register has gone from being a neutral expert to a political player. In theory, the bill would help mitigate this effect by making this Register <i>more </i>accountable to the public – after all, under the current regime the Register answers only to the Librarian of Congress. In practice, though, we fear it’s designed to do something else: allow powerful incumbent interests to use their lobbying power to control this increasingly politicized office.  No president is going to select an appointee that will be shot down by special interests. And while the Librarian of Congress still oversees the Copyright Office, the Librarian of Congress would not be able to remove the Register no matter how poorly they perform their job.</p>\n<p>In sum, we’ll have a Register, and a Copyright Office, that is accountable only to the President and the special interests that helped get them approved in the first place.  That will inevitably accelerate the politicization of the Office.</p>\n<p>Under the current system, the official in charge of selecting the Register is a member of the one community that can usually be trusted to think about all of the interests copyright law affects: librarians.  <a href=\"https://www.eff.org/deeplinks/2015/07/copyright-office-belongs-library\">As we’ve said before</a>, libraries have an institutional obligation to serve the public, and to support access to knowledge and culture. Given copyright’s constitutional mandate to promote progress, we think the Office’s mission is best served when it is subject to the oversight and guidance of the library community.</p>\n<p>It’s bad enough that Congress and the public can no longer look to the Register as a neutral arbiter of copyright policy.  We shouldn’t make the problem worse by effectively making the Copyright Office into an independent regulator and policymaker. Instead, the Register should remain an advisor to Congress and an administrator of the registration system.</p>\n\n</div></div></div><div class=\"share-links\" style=\"margin-bottom:10px\"><br/>Share this: <a href=\"https://twitter.com/intent/tweet?text=Let%E2%80%99s%20Make%20The%20Copyright%20Office%20Less%20Political%2C%20Not%20More&amp;url=https%3A//www.eff.org/deeplinks/2017/03/lets-make-copyright-office-less-political-not-more&amp;related=eff&amp;via=eff\" target=\"_blank\"><img src=\"https://www.eff.org/sites/all/themes/frontier/supporters/images/twitter48.png\" alt=\"Share on Twitter\" /></a> <a href=\"https://www.facebook.com/share.php?t=Let%E2%80%99s%20Make%20The%20Copyright%20Office%20Less%20Political%2C%20Not%20More&amp;u=https%3A//www.eff.org/deeplinks/2017/03/lets-make-copyright-office-less-political-not-more\" target=\"_blank\"><img src=\"https://www.eff.org/sites/all/themes/frontier/supporters/images/facebook48.png\" alt=\"Share on Facebook\" /></a> <a href=\"https://plus.google.com/share?url=https%3A//www.eff.org/deeplinks/2017/03/lets-make-copyright-office-less-political-not-more\" target=\"_blank\"><img src=\"https://www.eff.org/sites/all/themes/frontier/supporters/images/gplus48.png\" alt=\"Share on Google+\" /></a> <a href=\"https://sharetodiaspora.github.com/?title=Let%E2%80%99s%20Make%20The%20Copyright%20Office%20Less%20Political%2C%20Not%20More&amp;url=https%3A//www.eff.org/deeplinks/2017/03/lets-make-copyright-office-less-political-not-more\" target=\"_blank\"><img src=\"https://www.eff.org/sites/all/themes/frontier/supporters/images/diaspora48.png\" alt=\"Share on Diaspora\" /></a> <a href=\"https://supporters.eff.org/join\" style=\"background-color:#cc0000; color:#ffffff; text-decoration:none; cursor:pointer; padding:5px 8px; font-family:verdana; font-weight:bold; border-radius:8px; text-shadow: 1px 1px #660000; text-transform:uppercase;\">Join EFF</a></div>",
 "feed": "65f4d018aa2e1477e38964888b6532113c694af4",
 "guid": "95465 at https://www.eff.org",
 "id": "b9105c60a124d87c2eec80974de4a44a496385f7",
 "pubDate": "2017-03-28T01:26:39.000Z",
 "title": "Let’s Make The Copyright Office Less Political, Not More",
 "url": "https://www.eff.org/deeplinks/2017/03/lets-make-copyright-office-less-political-not-more"
}`}						  
						</pre>
					</div>
				</Modal>
				<MUIToggle
					disabled={!this.props.user.pushConfig.channelConfig.api.endpoint ? true : false}
				  toggled={this.props.user.pushConfig.channelConfig.api.isActive && this.props.user.pushConfig.channelConfig.api.endpoint ? true : false}
				  onTouchTap={this.toggle}
					iconStyle={{margin: '0 auto'}}/>
				<br/>
			</MUITableHeaderColumn>
		)
	},
	closeModal: function () {
		
		return this.setState({modalVisible: false})
	},
	onChangeEndpoint: function (e) {
		
		return this.setState({endpoint: e.target.value})
	},
	onChangeApiHeadersKey: function (e) {

		return this.setState({apiHeadersKey: e.target.value})
	},
	onChangeApiHeadersValue: function (e) {

		return this.setState({apiHeadersValue: e.target.value})
	},
	toggle: function () {

		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/api/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.api.isActive})
		.end((err, response) => {
			
			if (err) throw err
		
			return this.props.onUser(response.body)
		})
	},
	update: function () {
		
		var api = {
			isActive: this.state.endpoint && this.props.user.pushConfig.channelConfig.api.isActive ? true : false,
			endpoint: this.state.endpoint,
			headers: {
				key: this.state.apiHeadersKey,
				value: this.state.apiHeadersValue
			}
		}
		
		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/api')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({api: api})
		.end((err, response) => {
	
			if (err) throw err
			
			this.closeModal()
			
			return this.props.onUser(response.body)
		})
	},
	style1: function () {
		return {
			fontSize: '0.8rem',
	    background: '#bbb',
	    color: 'white',
	    padding: '24px',
		}
	}
})