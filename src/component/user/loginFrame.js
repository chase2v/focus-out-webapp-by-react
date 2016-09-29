import React, { Component } from 'react';

import Login from './login';

class LoginFrame extends Component {
	render () {
		return (
			<div className="login-frame" ref="frame">
				<Login disappear={ () => this.disappear() } />
			</div>
		)
	}

	disappear () {
		this.refs.frame.style.visibility = 'hidden';
	}
}

export default LoginFrame;