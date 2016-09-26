import React from 'react';

import { Link } from 'react-router'

const User = () => {
	return (
		<div className="user">
			<div className="card card-user">
				<div className="avatar"><i className="iconfont icon-user"></i></div>
				<p className="username">hajow</p>
				<ul className="options">
					<li><Link to="/timerCards">Timers</Link></li>
					<li>切换用户</li>
					<li>注销</li>
				</ul>
			</div>
		</div>
	)
}

export default User;
