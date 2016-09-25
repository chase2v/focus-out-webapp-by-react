import React, { Component } from 'react';

export default class TargetInfoCard extends Component {
	render () {
		return (
			<div className="info-card targetInfo-card">
				<div>Today: { this.props.target }</div>
				<div><i className="iconfont icon-star"></i></div>
			</div>
		)
	}
}

TargetInfoCard.propTypes = {
	target: React.PropTypes.number
}