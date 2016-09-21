import React from 'react';

import StatisticCard from './statisticCard';
import GraphCard from './graphCard';

const Statistic = React.createClass({

	moveLeft () {

	},

	moveRight () {

	},

	render () {

		// 模拟数据
		let mockData = [
			{
				name: 'study',
				iconClass: 'icon-study'
			},
			{
				name: 'writing',
				iconClass: 'icon-writing'
			},
			{
				name: 'reading',
				iconClass: 'icon-book'
			}
		];

		let statisticCards = [];
		for (var i = 0, d; d = mockData[i++]; ) {
			statisticCards.push(
				<StatisticCard key={ i } data={ d } />
			);
		}

		return (
			<div className="statistic">
				<div className="statistic-frame">
					<div className="button" onClick={ this.moveLeft }><i className="iconfont icon-left"></i></div>
					<div className="card-container" ref="cardContainer">
						{ statisticCards }
					</div>
					<div className="button" onClick={ this.moveRight }><i className="iconfont icon-right"></i></div>
				</div>
				<GraphCard />
			</div>
		)
	}
});

export default Statistic;
