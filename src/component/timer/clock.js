import React, { Component } from 'react';
import { connect } from 'react-redux';

import switchPlayState from '../../action/switchPlayState';
import switchPlayType from '../../action/switchPlayType';
import updateTime from '../../action/updateTime';
import updateUnit from '../../action/updateUnit';
import modifyStatistic from '../../action/modifyStatistic';


import createAnimationSingleton from './animation';

class Clock extends Component {

	componentDidMount () {
		// 监听浏览器窗口变化（最小化，最大化）
		// 因为当浏览器最小化后，计时器会停止计时
		// 所以应该记录最小化时的时间，恢复最大化时恢复计时器状态
		document.addEventListener('visibilitychange', function (event) {;
			let state = document.visibilityState;
			if (state === 'hidden') {
				this.hiddenTime = +new Date;
			} else if (state === 'visible') {
				this.showTime = +new Date;
				let differ = Math.round((this.showTime - this.hiddenTime )/ 50);

				if (this.props.playInfo.playState === 'play') {
					this.animation.i = this.animation.i + differ;
				}
			}
		}.bind(this));

		// 初始化画布以及设置绘制信息
		let cvs = this.refs.cvs,
		     ctx = cvs.getContext('2d');
		cvs.width = 500; // 设置画布大小
		cvs.height = 500;

		const center = [250, 250], //设置绘画数据
		     bigR = 200,
		     smallR = 100,
		     bigColor = '#f00',
		     smallColor = '#fff';

		let drawArg = {
			ctx: ctx,
			center: center,
			r: [bigR, smallR]
		}

		// 创建动画实例
		this.animation = createAnimationSingleton();
		this.animation.drawArg = drawArg;
		this.animation.clock = this;
		this.animation.addFuncToLoop(this.count, this, this.animation);

		// 绘制背景
		this.animation.drawBg();

		// 恢复状态
		if (this.props.playInfo.playState === 'pause') {
			this.animation.oneFrame(false);
		} else if (this.props.playInfo.playState === 'play') {
			this.refs.playbutton.style.display = 'none';
			this.refs.buttonGroup.style.display = 'block';
		}
	}

	/**
	 * 按钮：播放
	 * @param  msg : 'stop' / 'pause'
	 */
	clickHandler (msg) {
		let playState = this.props.playInfo.playState,
		     dispatch = this.props.dispatch;

		switch (playState) {
			case 'stop' :
			case 'pause' :
				this.play();
				break;
			case 'play' :
				this.refs.playbutton.style.display = 'block';
				this.refs.buttonGroup.style.display = 'none';
				dispatch(switchPlayState(msg));
				this.animation[msg]();
				break;
			default:
		}
	}

	/**
	 * 计时器开始计时
	 * 1.设置动画的颜色、执行总时间、帧单位时间
	 * 2.动画开始播放
	 * 3.触发动作：切换计时器状态
	 * 4.切换按钮图标
	 */
	play () {
		let color, totalTime, unitTime = 50;
		if (this.props.playInfo.playType === 'work') {
			totalTime = this.props.timers[this.props.playInfo.currentTimer - 1].work;
			color = ['#f00', '#0f0'];
		} else {
			totalTime = this.props.timers[this.props.playInfo.currentTimer - 1].break;
			color = ['#0f0', '#f00'];
		}

		this.animation.play(totalTime, 50, color);
		this.props.dispatch(switchPlayState('play'));
		this.refs.playbutton.style.display = 'none';
		this.refs.buttonGroup.style.display = 'block';
	}

	/**
	 * 计时器停止计时
	 * 触发动作：
	 * 1.更新时间
	 * 2.更新时间单位
	 */
	stop () {
		this.props.dispatch(updateTime({
			work:this.props.timers[this.props.playInfo.currentTimer - 1].work,
			break:this.props.timers[this.props.playInfo.currentTimer - 1].break
		}));		
		this.props.dispatch(updateUnit({
			workUnit:'minutes',
			breakUnit:'minutes'
		}));
	}

	/**
	 * 动画结束时调用次函数
	 * 1.切换按钮图标
	 * 2.记录完成次数
	 * 3.触发动作：
	 * 	1.切换计时器状态
	 * 	2.切换计时器类型： ’work' → ‘break’
	 * 	3.更新计时器时间
	 * 	4.更新计时器单位
	 */
	complete () {
		let dispatch = this.props.dispatch;

		this.refs.playbutton.style.display = 'block';
		this.refs.buttonGroup.style.display = 'none';
		this.record();
		dispatch(switchPlayState('stop'));
		dispatch(switchPlayType());
		dispatch(updateTime({
			work:this.props.timers[this.props.playInfo.currentTimer - 1].work,
			break:this.props.timers[this.props.playInfo.currentTimer - 1].break
		}));
		dispatch(updateUnit({
			workUnit:'minutes',
			breakUnit:'minutes'
		}));
	}

	/**
	 * 记录完成次数
	 */
	record () {
		if (this.props.playInfo.playType !== 'work') {
			return;
		}
		let date = +new Date(new Date().toLocaleDateString());

		let statistic = {
			date: date,
			id: this.props.playInfo.currentTimer,
			change: 1
		}

		this.props.dispatch(modifyStatistic(statistic));
	}

	/**
	 * 切换时间单位
	 * 因为当剩余计时时间小于或等于一分钟时，右侧展示面板计时单位会从 ’minutes‘ 编程 ’second‘
	 * @param  that : 动画实例
	 */
	count (that) {
		let interval = that.interval,
			timesOneMin = 1000 * 60 / interval,
			timesOneSec = 1000 / interval;

		let workUnit = this.props.playInfo.workUnit,
			breakUnit = this.props.playInfo.breakUnit,
			workTime = this.props.playInfo.work,
			breakTime = this.props.playInfo.break,
			dispatch = this.props.dispatch;

		let remainTime = (that.times - that.i) * interval;

		let workCounter = function () {
			if (workUnit === 'minutes' && that.i % timesOneMin === 0) {
				dispatch(updateTime({work:--workTime,break:breakTime}));
			}
			if (remainTime <= 60000) {
				workUnit = 'seconds';
				let time = Math.ceil(remainTime / 1000);
				if (remainTime % 1000 === 0) {
					dispatch(updateTime({work:time,break:breakTime}));
					dispatch(updateUnit({workUnit:workUnit,breakUnit:breakUnit}));
				}
			}
		}

		let breakCounter = function () {
			if (breakUnit ===  'minutes' && that.i % timesOneMin === 0) {
				dispatch(updateTime({work:workTime,break:--breakTime}));
			}
			if (remainTime <= 60000) {
				breakUnit = 'seconds';
				let time = Math.ceil(remainTime / 1000);
				if (remainTime % 1000 === 0) {
					dispatch(updateTime({work:workTime,break:time}));
					dispatch(updateUnit({workUnit:workUnit,breakUnit:breakUnit}));
				}
			}
		}

		this.props.playInfo.playType === 'work' ? workCounter() : breakCounter();
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
}

Clock.propTypes = {
	playInfo: React.PropTypes.shape({
		playState: React.PropTypes.string,
		playType: React.PropTypes.string,
		currentTimer: React.PropTypes.number,
		work: React.PropTypes.number,
		break: React.PropTypes.number,
		workUnit: React.PropTypes.string,
		breakUnit: React.PropTypes.string
	})
}

const clock = connect((state) => {
	return {
		playInfo: state.playInfo,
		timers: state.userInfo.timers
	}
})(Clock);

export default clock;