import React, { Component } from 'react';

export default class TimerSwitcher extends Component {
	render () {
		return (
			<div className="timerSwitcher">
				<div className="button" onClick={ () => this.props.switchTimer('left') }><i className="iconfont icon-left"></i></div>
				<div>{ this.props.currentTimerName }</div>
				<div className="button" onClick={ () => this.props.switchTimer('right') }><i className="iconfont icon-right"></i></div>
			</div>
		)
	}
}

TimerSwitcher.propTypes = {
	currentTimerName: React.PropTypes.string
}