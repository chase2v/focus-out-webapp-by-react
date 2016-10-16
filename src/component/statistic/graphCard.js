import React, { Component } from 'react';
import { connect } from 'react-redux';

import StatisticHandler from './StatisticHandler';

class GraphCard extends Component {

	componentWillMount () {
		// 初始化数据，若使用 mock 的数据，可以在这里更改
		this.statistics = StatisticHandler.process(this.props.statistics, this.props.params.timerId);
	}

	componentDidMount () {
		// 初始化画布
		let cvs = this.refs.cvs,
			ctx = cvs.getContext('2d');
		cvs.width = 700;
		cvs.height = 400;
		ctx.translate(25, 25);

		// 如果有数据，展示数据
		// 如果没有，则提示 “还没有数据”
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
	 * @param  ctx : 画布背景
	 * @param  per : 进度百分比
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

	/**
	 * 绘制曲线
	 * @param  ctx : 画布背景
	 * @param  per : 进度百分比
	 */
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

GraphCard.propTypes = {
	statistics: React.PropTypes.array
}

const graphCard = connect(state => {
	return {
		statistics: state.userInfo.statistics
	}
})(GraphCard);

export default graphCard;
