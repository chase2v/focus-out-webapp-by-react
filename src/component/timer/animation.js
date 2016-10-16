var createAnimationSingleton = (function () {
	let animation,
	     i = 0;
	return function () {
		if (!animation) {
			animation = new ClockAnimation();
			i++;
		}
		return animation;
	}
})();

class ClockAnimation {

	constructor () {
		this.i = 0; // 计数器
		this.currentPos = 1.5 * Math.PI;
		this.intervalFunc = []; // 计时器需要执行的函数
	}

	/**
	 * 绘制背景
	 * @return {[type]} [description]
	 */
	drawBg () {
		let {ctx, center, r} = this.drawArg;
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000';

		// 开始绘制背景时钟
		const drawCircle = (center, r, fillStyle) => {
			ctx.beginPath();
			ctx.fillStyle = fillStyle;
			ctx.arc(center[0], center[1], r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}
		drawCircle(center, r[0], '#f00'); // 绘制大圆
		drawCircle(center, r[1], '#fff'); // 绘制小圆
	}

	/**
	 * 创建计时器
	 * @return {[type]} [description]
	 */
	_createInterval (interval) {
		this.currentInterval = setInterval(() => {
			this.oneFrame(false);
			this.i++;
			
			if (this.addToLoop) {
				this.addToLoop();
			}

			if (this.i === this.times) {
				clearInterval(this.currentInterval);
				this._complete();
			}
		}, interval);
	}

	/**
	 * 添加函数至计时器中
	 * @param {[type]} func [description]
	 */
	addFuncToLoop () {
		let func = Array.prototype.shift.apply(arguments),
			additonal = func.bind(...arguments);
		this.addToLoop = additonal;
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
	oneFrame (direc) {
		let {ctx, center, r} = this.drawArg,
		//      nextPos = this.currentPos - this.radius;
		// if (direc) { nextPos = this.currentPos + this.radius };
			nextPos = 1.5 * Math.PI - this.radius * this.i;
		if (direc) { nextPos = this.currentPos + this.radius; }
		if (nextPos < 0) { nextPos = 2 * Math.PI + nextPos}
		else if (nextPos > 2 * Math.PI) { nextPos = nextPos - 2 * Math.PI};
		this.currentPos = nextPos;

		// 绘制
		ctx.strokeStyle = '#000';
		ctx.fillStyle = '#ccc';
		if (direc) { ctx.fillStyle = this.color[0] }
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
		this.radius = (2 * Math.PI) / this.times; // 每次动画的弧度
		this.interval = interval;

		this._createInterval(interval);
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
		this.clock.stop();
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
		this.radius = totalRadius / this.i;
		let thisInterval = setInterval( () => {
			this.oneFrame(true);
			this.i--;

			if (this.i === 0) {
				clearInterval(thisInterval);
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
}

export default createAnimationSingleton;
