var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUITable from 'material-ui/Table/Table'
import MUITableHeader from 'material-ui/Table/TableHeader'
import MUITableBody from 'material-ui/Table/TableBody'
import MUITableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import MUITableRow from 'material-ui/Table/TableRow'
import MUITableRowColumn from 'material-ui/Table/TableRowColumn'
// import MUIServerIcon from 'material-ui/svg-icons/action/dns'
// import MUIShieldIcon from 'material-ui/svg-icons/hardware/security'
// import MUIDialogIcon from 'material-ui/svg-icons/communication/forum'
// import MUINotificationsIcon from 'material-ui/svg-icons/social/notifications-active'

import Modal from './Modal'
import FeatureAllWorldsFeeds from './FeatureAllWorldsFeeds'
import FeatureApiAndGui from './FeatureApiAndGui'
import FeatureAnyArticle from './FeatureAnyArticle'
import FeaturePushNotifications from './FeaturePushNotifications'


module.exports = MUIThemeable()(React.createClass({
  getInitialState: function () {
    return {
      selectedRssFeed: 3,
      /*
        techcrunch
        ap
        xkcd
        eff
        ffffound
        the weather channel
        nyt
        theverge
      */
    }
  },
  render: function () {
    return (
      <div style={this.style1()}>
        <FeatureAllWorldsFeeds selectedRssFeed={this.state.selectedRssFeed} handleRssSelect={this.handleRssSelect}/>
        <FeatureApiAndGui selectedRssFeed={this.state.selectedRssFeed}/>
        <FeatureAnyArticle selectedRssFeed={this.state.selectedRssFeed}/>
        <FeaturePushNotifications selectedRssFeed={this.state.selectedRssFeed}/>
      </div>
    )
  },
  PricingModal: function () {
		return (
			<Modal isOpen={this.state.modalVisible} onClose={this.closeModal} actions={[<MUIRaisedButton onTouchTap={this.closeModal} label="Close"/>]} title="Push Notifications Pricing">
				<div>
					<MUITable selectable={false}>
						<MUITableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<MUITableRow>
								<MUITableHeaderColumn>
									Email
								</MUITableHeaderColumn>
								<MUITableHeaderColumn>
									SMS
								</MUITableHeaderColumn>
								<MUITableHeaderColumn>
									API
								</MUITableHeaderColumn>
							</MUITableRow>
						</MUITableHeader>
						<MUITableBody displayRowCheckbox={false}>
							<MUITableRow>
								<MUITableRowColumn>$0.001</MUITableRowColumn>
								<MUITableRowColumn>$0.05</MUITableRowColumn>
								<MUITableRowColumn>$0.0001</MUITableRowColumn>
							</MUITableRow>
						</MUITableBody>
					</MUITable>
					<small><sup>*</sup>You will be locked into your pricing when you sign-up, and always get the lower rate as prices fluctuate</small>
				</div>
			</Modal>
		)
	},
  handleRssSelect: function (idx) {

    this.setState({selectedRssFeed: idx})
  },
	closeModal: function () {

		this.setState({modalVisible: false})
	},
  style1: function () {
    return {
      display: window.innerWidth > 1000 ? 'block' : 'none',
      paddingRight: window.innerWidth/7,
      paddingLeft: window.innerWidth/7,
      backgroundColor: this.props.muiTheme.palette.canvasColor
    }
  }
}))
