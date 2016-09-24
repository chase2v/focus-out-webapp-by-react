import React from 'react';

import StatisticCardFrame from './statisticCardFrame'
import GraphCard from './graphCard';

const Statistic = React.createClass({
	render () {
		return (
			<div className="statistic">
				<StatisticCardFrame />
			</div>
		)
	}
});

export default Statistic;
