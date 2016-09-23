import React from 'react';

import StatisticCard from './statisticCard';
import GraphCard from './graphCard';

const Statistic = React.createClass({

	moveLeft () {
		let container = this.refs.cardContainer;
		let initLeft = parseFloat(window.getComputedStyle(container).left);
		let i = 0;

		if (this.pointer < this.cardSum - 1) {
			let interval = setInterval(()=> {
				let currentLeft = parseFloat(window.getComputedStyle(container).left);
				this.refs.cardContainer.style.left = ( currentLeft - 243 / 25 ) + 'px';
				i++;
				if (i === 25) {
					this.refs.cardContainer.style.left = ( initLeft - 243 ) + 'px';
					clearInterval(interval);
				}
			},10);
			container.children[this.pointer].className = container.children[this.pointer].className.replace(' card-statistic-focus', '');
			this.pointer++;
			container.children[this.pointer].className += ' card-statistic-focus';
		}
	},

	moveRight () {
		let container = this.refs.cardContainer;
		let initLeft = parseFloat(window.getComputedStyle(container).left);
		let i = 0;

		if (this.pointer > 0) {
			let interval = setInterval(()=> {
				let currentLeft = parseFloat(window.getComputedStyle(container).left);
				this.refs.cardContainer.style.left = ( currentLeft + 243 / 25 ) + 'px';
				i++;
				if (i === 25) {
					this.refs.cardContainer.style.left = ( initLeft + 243 ) + 'px';
					clearInterval(interval);
				}
			},10);
			container.children[this.pointer].className = container.children[this.pointer].className.replace(' card-statistic-focus', '');
			this.pointer--;
			container.children[this.pointer].className += ' card-statistic-focus';
		}
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

		this.pointer = 0;
		let statisticCards = [];
		for (let i = 0, d; d = mockData[i++]; ) {
			statisticCards.push(
				<StatisticCard key={ i } data={ d } focus={ i === this.pointer+1 ? true : false } />
			);
		}
		this.cardSum = statisticCards.length;

		return (
			<div className="statistic">
				<div className="statistic-frame">
					<div className="button" onClick={ this.moveLeft }><i className="iconfont icon-left"></i></div>
					<div className="card-frame">
						<div className="card-container" ref="cardContainer">
							{ statisticCards }
						</div>
					</div>
					<div className="button" onClick={ this.moveRight }><i className="iconfont icon-right"></i></div>
				</div>
				<GraphCard />
			</div>
		)
	}
});

export default Statistic;
