import React, { Component } from 'react';
import { connect } from 'react-redux';

import StatisticCardFrame from './statisticCardFrame'
import GraphCard from './graphCard';

class Statistic extends Component {
	render () {
		return (
			<div className="statistic">
				<StatisticCardFrame timers={ this.props.timers }/>
			</div>
		)
	}
}

Statistic.propTypes = {
	timers: React.PropTypes.array
}

const statistic = connect(state => {
	return {
		timers: state.userInfo.timers
	}
})(Statistic);

export default statistic;
