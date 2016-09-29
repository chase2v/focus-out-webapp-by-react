import React from 'react';
import { Link } from 'react-router'

import LoginFrame from './loginFrame';

const User = () => {
	return (
		<div className="user">
			<div className="card card-user">
				<div className="avatar"><i className="iconfont icon-user"></i></div>
				<p className="username">hajow</p>
				<ul className="options">
					<li><Link to="/timerCards">Timers</Link></li>
					<li>注销</li>
				</ul>
			</div>
			<LoginFrame />
		</div>
	)
}

export default User;
