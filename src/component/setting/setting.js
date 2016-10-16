import React from 'react';

const Setting = React.createClass({
	/**
	 * 点击处理函数
	 * 1.根据状态判断是正面还是反面
	 * 2.然后添加删除类名触发动画
	 * @param  {event} e 事件对象
	 * @return {} 
	 */
	clickHandler (e) {
		// console.log('这里会旋转卡片');
		let className = this.refs.settingCard.className;
		if (className.indexOf(' card-rotate-enter') === -1) {
			// console.log('翻转至背面');
			this.refs.settingCard.className = className.replace(' card-rotate-leave', '');
			this.refs.settingCard.className += ' card-rotate-enter';
		} else {
			// console.log('翻转至正面');
			this.refs.settingCard.className = className.replace(' card-rotate-enter', ' card-rotate-leave');
		}
	},

	render () {
		return (
			<div className="setting">
				<div className="card card-setting" ref="settingCard">
					<div className="card card-reverse" onClick={ this.clickHandler }>
						<div className="title">介绍</div>
						<div className="introduction">一个简单的APP。</div>
					</div>
					<div className="card card-positive">
						<div className="icon"><i className="iconfont icon-setting"></i></div>
						<ul className="options">
							<li onClick={ this.clickHandler }>介绍</li>
							<li>清除所有数据</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
});

export default Setting;
