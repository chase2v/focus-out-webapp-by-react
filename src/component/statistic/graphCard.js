import React, { Component } from 'react';

class GraphCard extends Component {

	componentDidMount () {
		let cvs = this.refs.cvs,
			ctx = cvs.getContext('2d');
		cvs.width = 700;
		cvs.height = 400;

		ctx.strokeStyle = '#000';
		ctx.lineWidth = 1;

		ctx.translate(25, 25);

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
		}
		// 画 y 轴
		for (let i = 1; i <= 30; i++) {
			ctx.moveTo(20 * i + 5, 20);
			ctx.lineTo(20 * i + 5, 320);
		}
		ctx.stroke();
	}

	render () {
		return (
			<div className="card card-graph">
				<canvas ref="cvs"></canvas>
			</div>
		)
	}
}

export default GraphCard;
