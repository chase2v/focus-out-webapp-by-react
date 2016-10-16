import React, { Component } from 'react';

import Login from './login';

export default class LoginFrame extends Component {
	
	disappear () {
		this.refs.frame.style.visibility = 'hidden';
	}

	render () {
		return (
			<div className="login-frame" ref="frame">
				<Login disappear={ () => this.disappear() } />
			</div>
		)
	}
}