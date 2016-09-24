import React, { Component } from 'react';

import StatisticHandler from './StatisticHandler';

class GraphCard extends Component {

	componentWillMount () {
		// 模拟取回数据
		this.statistics = [
			{
				date: 1471622400000,
				d: [
					{
						timerId: 1,
						playTimes: 10
					}
				]
			},
			{
				date: 1471708800000,
				d: [
					{
						timerId: 1,
						playTimes: 11
					}
				]
			},
			{
				date: 1471795200000,
				d: [
					{
						timerId: 1,
						playTimes: 12
					}
				]
			},
			{
				date: 1471881600000,
				d: [
					{
						timerId: 1,
						playTimes: 13
					}
				]
			},
			{
				date: 1471968000000,
				d: [
					{
						timerId: 1,
						playTimes: 14
					}
				]
			},
			{
				date: 1472054400000,
				d: [
					{
						timerId: 1,
						playTimes: 15
					}
				]
			},
			{
				date: 1472140800000,
				d: [
					{
						timerId: 1,
						playTimes: 14
					}
				]
			},
			{
				date: 1472227200000,
				d: [
					{
						timerId: 1,
						playTimes: 13
					}
				]
			},
			{
				date: 1472313600000,
				d: [
					{
						timerId: 1,
						playTimes: 12
					}
				]
			},
			{
				date: 1472400000000,
				d: [
					{
						timerId: 1,
						playTimes: 11
					}
				]
			},
			{
				date: 1472486400000,
				d: [
					{
						timerId: 1,
						playTimes: 10
					}
				]
			},
			{
				date: 1472572800000,
				d: [
					{
						timerId: 1,
						playTimes: 11
					}
				]
			},
			{
				date: 1472659200000,
				d: [
					{
						timerId: 1,
						playTimes: 12
					}
				]
			},
			{
				date: 1472745600000,
				d: [
					{
						timerId: 1,
						playTimes: 13
					}
				]
			},
			{
				date: 1472832000000,
				d: [
					{
						timerId: 1,
						playTimes: 14
					}
				]
			},
			{
				date: 1472918400000,
				d: [
					{
						timerId: 1,
						playTimes: 15
					}
				]
			},
			{
				date: 1473004800000,
				d: [
					{
						timerId: 1,
						playTimes: 14
					}
				]
			},
			{
				date: 1473091200000,
				d: [
					{
						timerId: 1,
						playTimes: 13
					}
				]
			},
			{
				date: 1473177600000,
				d: [
					{
						timerId: 1,
						playTimes: 12
					}
				]
			},
			{
				date: 1473264000000,
				d: [
					{
						timerId: 1,
						playTimes: 11
					}
				]
			},
			{
				date: 1473350400000,
				d: [
					{
						timerId: 1,
						playTimes: 10
					}
				]
			},
			{
				date: 1473436800000,
				d: [
					{
						timerId: 1,
						playTimes: 11
					}
				]
			},
			{
				date: 1473523200000,
				d: [
					{
						timerId: 1,
						playTimes: 12
					}
				]
			},
			{
				date: 1473609600000,
				d: [
					{
						timerId: 1,
						playTimes: 13
					}
				]
			},
			{
				date: 1473696000000,
				d: [
					{
						timerId: 1,
						playTimes: 14
					}
				]
			},
			{
				date: 1473782400000,
				d: [
					{
						timerId: 1,
						playTimes: 15
					}
				]
			},
			{
				date: 1473868800000,
				d: [
					{
						timerId: 1,
						playTimes: 14
					}
				]
			},
			{
				date: 1473955200000,
				d: [
					{
						timerId: 1,
						playTimes: 13
					}
				]
			},
			{
				date: 1474041600000,
				d: [
					{
						timerId: 1,
						playTimes: 12
					}
				]
			},
			{
				date: 1474128000000,
				d: [
					{
						timerId: 1,
						playTimes: 11
					}
				]
			},
			{
				date: 1474214400000,
				d: [
					{
						timerId: 1,
						playTimes: 10
					}
				]
			},
			{
				date: 1474300800000,
				d: [
					{
						timerId: 1,
						playTimes: 11
					}
				]
			}
		];
		this.statistics = StatisticHandler.process(this.statistics, this.props.params.timerId);
	}

	componentDidMount () {
		let cvs = this.refs.cvs,
			ctx = cvs.getContext('2d');
		cvs.width = 700;
		cvs.height = 400;
		ctx.translate(25, 25);

		if (this.statistics) {
			let i = 0;
			let interval = setInterval(() => {
				i++;
				this.drawAnimation(ctx, .02 * i);
				if (i === 50) {
					clearInterval(interval);
				}
			}, 20);
		} else {
			this.drawAnimation(ctx, 1);
			let announce = document.createElement('div');
			announce.innerHTML = '暂时还没有数据';
			announce.className = 'announce';
			this.refs.card.appendChild(announce);
		}
	}

	/**
	 * 绘制数据线
	 * @return {[type]} [description]
	 */
	drawAnimation (ctx, per) {
		ctx.clearRect(0, 0, 700, 400);
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 1;

		// 画y轴的箭头
		ctx.beginPath();
		ctx.moveTo(0, 10);
		ctx.lineTo(5, 0);
		ctx.lineTo(10, 10);
		// 画 y 轴
		ctx.moveTo(5, 0);
		ctx.lineTo(5, 320);
		// 画 x 轴
		ctx.lineTo(625, 320);
		//画 x 轴箭头
		ctx.moveTo(615, 315);
		ctx.lineTo(625, 320);
		ctx.lineTo(615, 325);

		ctx.stroke();

		// 画格子背景
		ctx.strokeStyle = '#ccc';
		ctx.beginPath();
		// 画 x 轴
		for (let i = 0; i < 30; i++) {
			ctx.moveTo(5, i * 10 + 20);
			ctx.lineTo(605, i * 10 + 20);
			
			if (i % 2 === 0 && per === 1) {
				let textDiv = document.createElement('div');
				textDiv.innerHTML = 30 - i;
				this.refs.yTag.appendChild(textDiv);
			}
		}

		// 画 y 轴
		for (let i = 1; i <= 30; i++) {
			ctx.moveTo(20 * i + 5, 20);
			ctx.lineTo(20 * i + 5, 320);

			// 添加日期
			if ((i % 5 === 0 || i === 1) && per === 1) {
				let date = +new Date();
				date = date - 29 * 86400000;
				date = date + (i - 1) * 86400000;
				date = new Date(date).toLocaleDateString();
				date = date.replace(/^\d{4}\//, '');

				let textDiv = document.createElement('div');
				textDiv.innerHTML = date;
				this.refs.xTag.appendChild(textDiv);
			}
		}
		ctx.stroke();

		if (this.statistics) {
			this.drawCurve(ctx, per);
		}
	}

	drawCurve (ctx, per) {
		ctx.fillStyle = 'rgba(253, 109, 109, .6)';
		ctx.strokeStyle = '#000';
		ctx.beginPath();
		ctx.moveTo(605, 320);
		ctx.lineTo(5, 320);
		ctx.lineTo(5, 320 - this.statistics[0] * per * 10);
		ctx.strokeStyle = '#f00';
		for (let i = 0; i < 30; i++) {
			let value = this.statistics[i + 1] * per;
			if (!value) {
				value = 0;
			}
			ctx.lineTo(20 * (i + 1) + 5, 320 - value * 10);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	render () {
		return (
			<div className="card card-graph" ref="card">
				<canvas ref="cvs"></canvas>
				<div className="yTag" ref="yTag"></div>
				<div className="xTag" ref="xTag"></div>
			</div>
		)
	}
}

export default GraphCard;
