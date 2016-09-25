import React, { Component } from 'react';

export default class TimerInfoCard extends Component {
	render () {
		return (
			<div className="info-card timerInfo-card">
				<div>{ this.props.timerInfo.time }</div>
				<div>{ this.props.timerInfo.unit }</div>
				<div>{ this.props.timerInfo.type}</div>
			</div>
		)
	}
}

TimerInfoCard.propTypes = {
	timerInfo: React.PropTypes.shape({
		time: React.PropTypes.number,
		unit: React.PropTypes.string,
		type: React.PropTypes.string
	})
}