import React, { Component } from 'react';

import switchPlayState from '../../action/switchPlayState';
import switchPlayType from '../../action/switchPlayType';

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

		// 暴露绘画数据到全局，便于动画函数调用
		this.drawArg = {
			ctx: ctx,
			center: center,
			r: [bigR, smallR]
		}

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

	}

	componentWillReceiveProps (nextProps) {
		console.log(nextProps.playInfo.playState);
	}

	render () {
		return (
			<div className="clock">
				<canvas ref="cvs"></canvas>
				<div className="button" onClick={ () => this.clickHandler('play') } ref="playbutton"><i className="iconfont icon-play"></i></div>
				<div className="button-group" ref="buttonGroup">
					<div onClick={ () => this.clickHandler('pause') } id="pause"><i className="iconfont icon-pause"></i></div>
					<div onClick={ () => this.clickHandler('stop') } id="stop"><i className="iconfont icon-stop"></i></div>
				</div>
			</div>
		)
	}

	/**
	 * 播放按钮
	 * @return {} 
	 */
	clickHandler (msg) {
		let playState = this.props.playInfo.playState,
		     dispatch = this.props.dispatch,
		     animation = createAnimationSingleton(this.drawArg, this);

		let color, totalTime;
		if (this.props.playInfo.playType === 'work') {
			totalTime = this.props.timer.work;
			color = ['#f00', '#0f0'];
		} else {
			totalTime = this.props.timer.break;
			color = ['#0f0', '#f00'];
		}

		switch (playState) {
			case 'stop' :
				this.refs.playbutton.style.display = 'none';
				this.refs.buttonGroup.style.display = 'block';
				dispatch(switchPlayState('play'));
				animation.play(totalTime, 50, color);
				break;
			case 'pause' :
				this.refs.playbutton.style.display = 'none';
				this.refs.buttonGroup.style.display = 'block';
				dispatch(switchPlayState('play'));
				animation.play(totalTime, 50, color);
				break;
			case 'play' :
				this.refs.playbutton.style.display = 'block';
				this.refs.buttonGroup.style.display = 'none';
				dispatch(switchPlayState(msg));
				animation[msg]();
				break;
			default:
		}
	}

	/**
	 * 动画结束时调用次函数
	 * @return {[type]} [description]
	 */
	complete () {
		this.refs.playbutton.style.display = 'block';
		this.refs.buttonGroup.style.display = 'none';
		dispatch(switchPlayState('stop'));
		dispatch(switchPlayType());
	}


	backup () {
		
	}

	/**
	 * 每次进入时钟，恢复上次动画的会话
	 * @return {[type]} [description]
	 */
	restore () {

	}
}

window.createAnimationSingleton = (function () {
	let animation,
	     i = 0;
	return function (drawArg, clock) {
		if (!animation) {
			animation = new ClockAnimation(drawArg, clock);
			i++;
		}
		console.log(i);
		return animation;
	}
})();

class ClockAnimation {

	constructor (drawArg, clock) {
		this.i = 0; // 计数器
		this.drawArg = drawArg;
		this.currentPos = 1.5 * Math.PI;
		this.clock = clock; // clock组件的引用
	}

	/**
	 * 每一帧的动画
	 * 需要知道的参数：
	 * 1.每次的弧度
	 * 2.方向
	 * 需要计算的参数：
	 * 1.当前位置
	 * 2.下一个位置
	 * 要做的事：
	 * 1.获取绘画参数
	 * 2.计算绘制参数
	 * 3.绘制大弧，绘制小圆
	 * @return {[type]} [description]
	 */
	oneFrame (radius, direc, color) {
		let {ctx, center, r} = this.drawArg,
		     nextPos = this.currentPos - radius;
		if (direc) { nextPos = this.currentPos + radius };
		if (nextPos < 0) { nextPos = 2 * Math.PI + nextPos}
		else if (nextPos > 2 * Math.PI) { nextPos = nextPos - 2 * Math.PI};
		this.currentPos = nextPos;

		// 绘制
		ctx.strokeStyle = '#000';
		ctx.fillStyle = '#ccc';
		if (direc) { ctx.fillStyle = color }
		ctx.beginPath();
		ctx.moveTo(center[0], center[1]);
		ctx.lineTo(center[0], center[1] - r[0]);
		ctx.arc(center[0], center[1], r[0], 1.5 * Math.PI, nextPos, !direc);
		ctx.lineTo(center[0], center[1]);
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(center[0], center[1], r[1], 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}

	/**
	 * 开始动画
	 * 1.记录当前时间
	 * 2.设置新的定时器
	 * 3.循环进行单帧动画，并进行计数
	 * 4.完成时清除定时器、并通知完成函数
	 * @param  { number } totalTime 计时器进行的分钟数
	 * @param  { number } interval 计时器的间隔时间（ms）
	 * @return {[type]}            [description]
	 */
	play (totalTime, interval, color) {
		if (!totalTime || !interval || !color) {
			throw Error('播放动画需要设置参数！');
		}

		this.times = (totalTime * 60 * 1000) / interval; // 定时器需要循环的次数
		this.color = color;
		this.startTime = +new Date();
		this.interval = interval;
		let radius = (2 * Math.PI) / this.times; // 每次动画的弧度

		this.currentInterval = setInterval(() => {
			this.oneFrame(radius, false, color[0]);
			this.i++;
			console.log(this.i);

			if (this.i === this.times) {
				clearInterval(this.currentInterval);
				this._complete();
			}
		}, interval);
	}

	/**
	 * 暂停动画
	 * 1.清除定时器
	 * @return {[type]} [description]
	 */
	pause () {
		clearInterval(this.currentInterval);
	}

	/**
	 * 停止动画
	 * 1.清除定时器
	 * 2.执行撤销函数
	 * @return {[type]} [description]
	 */
	stop () {
		clearInterval(this.currentInterval);
		this._undo();
	}

	/**
	 * 撤销动画函数：
	 * 1.设置定时器
	 * 2.计数器为0时，清除定时器
	 * 3.总时长为1s
	 * @return {[type]} [description]
	 */
	_undo () {
		this.i = 50;
		let interval = 1000 / this.i,
		     totalRadius = 1.5 * Math.PI - this.currentPos;
		if (totalRadius < 0) { totalRadius = 2 * Math.PI + totalRadius; }
		let radius = totalRadius / this.i,
		     that = this;
		this.currentInterval = setInterval( () => {
			this.oneFrame(radius, true, that.color[0]);
			this.i--;

			if (this.i === 0) {
				clearInterval(this.currentInterval);
				this._renew(this.color[0]);
			}
		}, interval);
	}

	/**
	 * 处理最后一帧黑线问题
	 * @return {[type]} [description]
	 */
	_renew (color) {
		let {ctx, center, r} = this.drawArg;
		const drawCircle = (center, r, fillStyle) => {
			ctx.beginPath();
			ctx.fillStyle = fillStyle;
			ctx.arc(center[0], center[1], r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}
		ctx.clearRect(0, 0, 500, 500);
		drawCircle(center, r[0], color); // 绘制大圆
		drawCircle(center, r[1], '#fff'); // 绘制小圆
	}

	/**
	 * 完成动画
	 * 1.恢复画布背景
	 * 2.重置计数器
	 * 3.通知clock组件结束
	 * @return {[type]} [description]
	 */
	_complete() {
		this._renew(this.color[1]);
		this.i = 0;
		this.clock.complete();
	}

	save() {

	}

	restore() {

	}

}

Clock.propTypes = {
	playInfo: React.PropTypes.shape({
		playState: React.PropTypes.string,
		playType: React.PropTypes.string,
		currentTimer: React.PropTypes.number
	})
}

export default Clock;