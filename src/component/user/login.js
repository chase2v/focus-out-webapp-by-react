import React, { Component } from 'react';
import sha1 from 'sha1';

import { connect  } from 'react-redux';
import updateInterfaceState from '../../action/updateInterfaceState';

class Login extends Component {

	constructor () {
		super();

		this.validateResult  = {
			username: 0,
			password: 0,
		}
		this.map = {
			login: {
				title: '登录',
				btnText: 'login',
				tip: '还没有账户？'
			},
			signup: {
				title: '注册',
				btnText: 'signup',
				tip: '已经有账户？'
			}
		}
	}

	/**
	 * 点击切换界面状态
	 * 注册 → 登录
	 * 登录 → 注册
	 * @return {[type]} [description]
	 */
	switch () {
		let state = this.props.state === 'login' ? 'signup' : 'login';
		this.props.dispatch(updateInterfaceState(state));
	}

	/**
	 * 登录和注册的逻辑
	 * @return {[type]} [description]
	 */
	login () {
		event.preventDefault();
		if (this.props.state === 'login') {
			this.refs.loading.style.display = 'block';

			// 发送 post 请求，加密密码
			let username = this.refs.username.value;
			let password = this.refs.password.value;
			let secret = sha1(password);
			let xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:1234');
			xhr.send('username='+username+'&password='+secret+'&type=login');
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					if (xhr.responseText === '登录成功') {
						this.props.disappear();
					} else if (xhr.responseText === '登录失败') {
						alert('登录失败');
						this.refs.loading.style.display = 'none';
					}
				}
			}
		}
		if (this.props.state === 'signup' && this.validateResult.username + this.validateResult.password === 2 ) {
			this.refs.loading.style.display = 'block';

			// 发送 post 请求，加密密码
			let username = this.refs.username.value;
			let password = this.refs.password.value;
			let secret = sha1(password);
			let xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:1234');
			xhr.send('username='+username+'&password='+secret+'&type=signup');
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					if (xhr.responseText === '创建成功') {
						this.props.disappear();
					} else if (xhr.responseText === '创建失败') {
						alert('创建失败');
						this.refs.loading.style.display = 'none';
					}
				}
			}
		}
	}

	/**
	 * 验证注册的用户名
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	validateUsername (event) {
		if (this.props.state === 'signup') {
			let value = event.target.value;
			let regexp = /^[a-zA-Z]{1}[a-zA-Z\u4e00-\u9fa5_0-9]{0,15}$/;
			let result = regexp.test(value);
			if (result) {
				this.refs.usernameCheck.style.display = 'inline-block';
				this.refs.usernameWrong.style.display = 'none';
				this.validateResult.username = 1;
			} else {
				this.refs.usernameCheck.style.display = 'none';
				this.refs.usernameWrong.style.display = 'inline-block';
				this.validateResult.username = 0;
			}
			if (!value) {
				this.refs.usernameCheck.style.display = 'none';
				this.refs.usernameWrong.style.display = 'none';
				this.validateResult.username = 0;
			}
		}
	}

	/**
	 * 验证注册的密码
	 * @param  event
	 */
	validatePassword (event) {
		if (this.props.state === 'signup') {
			let value = event.target.value;
			let regexp = /^\w{6,16}$/;
			let result = regexp.test(value);
			if (result) {
				this.refs.passwordCheck.style.display = 'inline-block';
				this.refs.passwordWrong.style.display = 'none';
				this.validateResult.password = 1;
			} else {
				this.refs.passwordCheck.style.display = 'none';
				this.refs.passwordWrong.style.display = 'inline-block';
				this.validateResult.password = 0;
			}
			if (!value) {
				this.refs.passwordCheck.style.display = 'none';
				this.refs.passwordWrong.style.display = 'none';
				this.validateResult.password = 0;
			}
		}
	}

	render () {
		return (
			<div className="login">
				<h2>{ this.map[this.props.state].title }</h2>
				<form>
					<label className="username">
						Username
						<i ref="usernameCheck" className="iconfont icon-check"></i>
						<i ref="usernameWrong" className="iconfont icon-wrong"></i>
						<br/>
						<input ref="username" onChange={ (event) => this.validateUsername(event) }/>
					</label><br/>
					<label className="password">
						Password
						<i ref="passwordCheck" className="iconfont icon-check"></i>
						<i ref="passwordWrong" className="iconfont icon-wrong"></i>
						<br/>
						<input ref="password"  onChange={ (event) => this.validatePassword(event) }/>
					</label><br/>
					<button onClick={ () => this.login() }>{ this.map[this.props.state].btnText }</button>
					<p onClick={ () => this.switch() }>{ this.map[this.props.state].tip }</p>
				</form>
				<div ref="loading" className="loading"></div>
			</div>
		)
	}
}
Login.propTypes = {
	state: React.PropTypes.string
}

let login = connect( state => {
	return {
		state: state.userInfo.interfaceState
	}
})(Login);

export default login;