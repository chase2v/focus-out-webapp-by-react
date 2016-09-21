import React, { Component } from 'react';
import { connect } from 'react-redux';

import playActionCreator from '../../action/playActionCreator';

class Clock extends Component {

	componentDidMount () {
		// console.log('Timer组件即将进入！');
		
		let cvs = this.refs.cvs,
		     ctx = cvs.getContext('2d');
		cvs.width = 500; // 设置画布大小
		cvs.height = 500;

		ctx.lineWidth = 1; // 设置线条样式
		ctx.strokeStyle = '#000';

		const center = [250, 250], //设置绘画数据
		     bigR = 200,
		     smallR = 100,
		     bigColor = '#f00',
		     smallColor = '#fff';

		// 开始绘制背景时钟
		const drawCircle = (center, r, fillStyle) => {
			ctx.beginPath();
			ctx.fillStyle = fillStyle;
			ctx.arc(center[0], center[1], r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}
		drawCircle(center, bigR, bigColor); // 绘制大圆
		drawCircle(center, smallR, smallColor); // 绘制小圆

	}

	componentWillUnmount ()  {
		// console.log('Timer组件即将销毁！');
	}

	render () {
		return (
			<div className="clock">
				<canvas ref="cvs"></canvas>
				<div className="button" onClick={ () => this.clickHandler() }><i className="iconfont icon-play"></i></div>
			</div>
		)
	}

	/**
	 * 播放按钮
	 * @return {} 
	 */
	clickHandler (e) {
		this.props.dispatch(playActionCreator());
	}

	// 时钟动画对象
	animation () {

		let startPos,
		     currentTime,
		     currentInterval;
		// const targetPos;
		// const totalTime;
		// const interval;

		// currentPos 计算

		const oneFrameAnimation = (currentPos, interval) => {

		} 

		/**
		 * start
		 * 1.记录当前时间
		 * 2.设置定时器
		 * @return {} 返回当前时间
		 */
		const start = () => {
			currentTime = +new Date();
			currentInterval = setInterval(() => {
				this.oneFrameAnimation();
			}, interval);
		}

		/**
		 * pause
		 * 1.记录当前位置
		 * 2.清除定时器
		 * @return {Number} 返回当前的位置
		 */
		const pause = () => {
			// currentPos = 0;
			clearInterval(currentInterval);
		}

		/**
		 * stop
		 * 1.清除定时器
		 * 2.绘制反向动画（撤销动画）
		 * 3.切换定时器类型（work？break？）
		 * @return {string} 返回下一个执行的计时器类型
		 */
		const stop = () => {
			clearInterval(currentInterval);
			// 画布绘制顺时针动画
		}

		return {
			start, 
			pause,
			stop
		}
	}

	// 执行动画对象
	animationHandler () {
		excute: () => {

		}
	}

}

Clock.propTypes = {
	playInfo: React.PropTypes.shape({
		playState: React.PropTypes.string,
		playType: React.PropTypes.string,
		currentTimer: React.PropTypes.number
	})
}

let clock = connect()(Clock);

export default clock;