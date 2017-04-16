var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'

import IconBuiding from '../images/icon-building.png'
import IconClock from '../images/icon-clock.png'
import IconDatabase from '../images/icon-database.png'
import IconDocument from '../images/icon-document.png'


module.exports = MUIThemeable()(React.createClass({
  render: function () {
    return (
      <div style={this.style1()}>
        <div style={Object.assign(this.style4(), {background: 'url('+ IconDatabase +') no-repeat -84px 0px'})}>
          <div style={this.style5()}>1636</div>
          <div style={this.style6()}>Indexed RSS Feeds</div>
        </div>
        <div style={Object.assign(this.style4(), {background: 'url('+ IconDocument +') no-repeat -50px 10px'})}>
          <div style={this.style5()}>1,831,614</div>
           <div style={this.style6()}>Saved articles</div>
        </div>
        <div style={Object.assign(this.style4(), {background: 'url('+ IconClock +') no-repeat -80px'})}>
          <div style={this.style5()}>4x</div>
          <div style={this.style6()}>Daily RSS polling</div>
        </div>
        <div style={Object.assign(this.style4(), {background: 'url('+ IconBuiding +') no-repeat -30px bottom'})}>
          <div style={this.style5()}>July 2016</div>
          <div style={this.style6()}>Established</div>
        </div>
      </div>
    )
  },
  style1: function () {
    return {
      display: 'flex',
      flexDirection: window.innerWidth > 1000 ? 'row' : 'column',
      // height: '20%',
      paddingRight: window.innerWidth > 1000 ? window.innerWidth/7 : 0,
      paddingLeft: window.innerWidth > 1000 ? window.innerWidth/7 : 0,
      backgroundColor: this.props.muiTheme.palette.primary1Color
    }
  },
  style4: function () {
		return {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			width: window.innerWidth > 1000 ? '25%' : '100%',
      padding: this.props.muiTheme.spacing.desktopGutter * 2,
			textAlign: 'center',
			color: this.props.muiTheme.palette.primary2Color,
			// border: '1px solid rgb(208, 208, 208)',
			// borderLeft: '1px solid rgb(208, 208, 208)',
		}
	},
	style5: function () {
		return {
			fontSize: '1.75rem',
			fontWeight: 'bold',
		}
	},
	style6: function () {
		return {
			fontSize: '1.25rem'
		}
	},
}))
