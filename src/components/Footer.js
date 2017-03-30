var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIRaisedButton from 'material-ui/RaisedButton'

var Modal = require('./Modal')


module.exports = MUIThemeable()(React.createClass({
	getInitialState: function () {
		return {
			modalTermsOfServiceVisible: false,
			modalContactVisible: false,
		}
	},
  render: function () {
    return (
			<div style={this.style1()}>
				PubCenter © {new Date().getFullYear()}
				  
				<span onTouchTap={() => this.setState({modalContactVisible: true})} style={{textDecoration: 'underline', cursor: 'pointer'}}>Contact</span>
				  
				<span onTouchTap={() => this.setState({modalTermsOfServiceVisible: true})} style={{textDecoration: 'underline', cursor: 'pointer'}}>Terms of Service</span>
				<Modal isOpen={this.state.modalTermsOfServiceVisible} onClose={this.closeTermsOfServiceModal} actions={[<MUIRaisedButton onTouchTap={this.closeTermsOfServiceModal} label="Close"/>]} title="PubCenter Terms of Service and Privacy Policy">
					<this.TermsOfService/>
				</Modal>
				<Modal isOpen={this.state.modalContactVisible} onClose={this.closeContactModal} actions={[<MUIRaisedButton onTouchTap={this.closeContactModal} label="Close"/>]} title="Contact">
					<div>Reach us on Twitter <a href="https://twitter.com/Pub_Center">(@Pub_Center)</a></div>
				</Modal>
			</div>
    )
  },
	TermsOfService: function () {
		return (
			<div>
				<h3>1. Terms</h3>
				<p>By accessing the website at <a href="http://pub.center">http://pub.center</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
				<h3>2. Use License</h3>
				<ol type="a">
				  <li>
				    Permission is granted to temporarily download one copy of the materials (information or software) on PubCenter&#39;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
				    <ol type="i">
				      <li>modify or copy the materials;</li>
				      <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
				      <li>attempt to decompile or reverse engineer any software contained on PubCenter&#39;s website;</li>
				      <li>remove any copyright or other proprietary notations from the materials; or</li>
				      <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
				    </ol>
				  </li>
				  <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by PubCenter at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
				</ol>
				<h3>3. Disclaimer</h3>
				<ol type="a">
				  <li>The materials on PubCenter&#39;s website are provided on an &#39;as is&#39; basis. PubCenter makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
				  <li>Further, PubCenter does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>
				</ol>
				<h3>4. Limitations</h3>
				<p>In no event shall PubCenter or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PubCenter&#39;s website, even if PubCenter or a PubCenter authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
				<h3>5. Accuracy of materials</h3>
				<p>The materials appearing on PubCenter&#39;s website could include technical, typographical, or photographic errors. PubCenter does not warrant that any of the materials on its website are accurate, complete or current. PubCenter may make changes to the materials contained on its website at any time without notice. However PubCenter does not make any commitment to update the materials.</p>
				<h3>6. Links</h3>
				<p>PubCenter has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PubCenter of the site. Use of any such linked website is at the user&#39;s own risk.</p>
				<h3>7. Modifications</h3>
				<p>PubCenter may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
				<h3>8. Governing Law</h3>
				<p>These terms and conditions are governed by and construed in accordance with the laws of CA and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
				<h2>Privacy Policy</h2>
				<p>Your privacy is important to us.</p>
				<p>It is PubCenter&#39;s policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.</p>
				<ul>
				  <li>We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.</li>
				  <li>Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.</li>
				  <li>We will collect and use personal information solely for fulfilling those purposes specified by us and for other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.</li>
				  <li>Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</li>
				  <li>We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</li>
				  <li>We will make readily available to customers information about our policies and practices relating to the management of personal information.</li>
				  <li>We will only retain personal information for as long as necessary for the fulfilment of those purposes.</li>
				</ul>
				<p>We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. PubCenter may change this privacy policy from time to time at PubCenter&#39;s sole discretion.</p>
			</div>
		)
	},
	closeTermsOfServiceModal: function () {
		
		this.setState({modalTermsOfServiceVisible: false})
	},
	closeContactModal: function () {
		
		this.setState({modalContactVisible: false})
	},
	style1: function () {
		return {
			// position: 'absolute',
			// bottom: 0,
			// width: '100%',
			padding: this.props.muiTheme.spacing.desktopGutter,
			fontFamily: this.props.muiTheme.fontFamily,
			fontSize: '0.75rem',
			// background: this.props.muiTheme.palette.primary2Color,
			color: this.props.muiTheme.palette.alternateTextColor,
			textAlign: 'center',
			backgroundColor: this.props.muiTheme.palette.primary3Color,
		}
	}
}))