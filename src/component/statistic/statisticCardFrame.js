import React, { Component } from 'react';

import StatisticCard from './statisticCard';

class StatisticCardFrame extends Component {

	moveLeft () {
		let cardBox = this.refs.cardBox;
		let initLeft = parseFloat(window.getComputedStyle(cardBox).left);
		let i = 0;

		if (this.pointer < this.cardSum - 1) {
			let interval = setInterval(()=> {
				let currentLeft = parseFloat(window.getComputedStyle(cardBox).left);
				cardBox.style.left = ( currentLeft - 243 / 25 ) + 'px';
				i++;
				if (i === 25) {
					cardBox.style.left = ( initLeft - 243 ) + 'px';
					clearInterval(interval);
				}
			},10);
			cardBox.children[this.pointer].className = cardBox.children[this.pointer].className.replace(' card-statistic-focus', '');
			this.pointer++;
			cardBox.children[this.pointer].className += ' card-statistic-focus';
		}
	}

	moveRight () {
		let cardBox = this.refs.cardBox;
		let initLeft = parseFloat(window.getComputedStyle(cardBox).left);
		let i = 0;

		if (this.pointer > 0) {
			let interval = setInterval(()=> {
				let currentLeft = parseFloat(window.getComputedStyle(cardBox).left);
				cardBox.style.left = ( currentLeft + 243 / 25 ) + 'px';
				i++;
				if (i === 25) {
					cardBox.style.left = ( initLeft + 243 ) + 'px';
					clearInterval(interval);
				}
			},10);
			cardBox.children[this.pointer].className = cardBox.children[this.pointer].className.replace(' card-statistic-focus', '');
			this.pointer--;
			cardBox.children[this.pointer].className += ' card-statistic-focus';
		}
	}

	render () {

		// 模拟数据
		let data = this.props.timers;

		this.pointer = 0;
		let statisticCards = [];
		for (let i = 0, d; d = data[i++]; ) {
			statisticCards.push(
				<StatisticCard key={ i } data={ d } focus={ i === this.pointer+1 ? true : false } />
			);
		}
		this.cardSum = statisticCards.length;

		return (
			<div className="frame-statistic-card">
				<div className="button" onClick={ () => this.moveLeft() }><i className="iconfont icon-left"></i></div>
				<div className="card-show-frame">
					<div className="card-box" ref="cardBox">
						{ statisticCards }
					</div>
				</div>
				<div className="button" onClick={ () => this.moveRight() }><i className="iconfont icon-right"></i></div>
			</div>
		)
	}
}

export default StatisticCardFrame;