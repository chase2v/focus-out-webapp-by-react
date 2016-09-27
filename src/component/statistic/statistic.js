import React from 'react';
import { connect } from 'react-redux';

import StatisticCardFrame from './statisticCardFrame'
import GraphCard from './graphCard';

const Statistic = React.createClass({
	render () {
		return (
			<div className="statistic">
				<StatisticCardFrame timers={ this.props.timers }/>
			</div>
		)
	}
});

const statistic = connect(state => {
	return {
		timers: state.userInfo.timers
	}
})(Statistic);

export default statistic;
