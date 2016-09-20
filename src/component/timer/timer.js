import React from 'react';

import Clock from './clock';
import TimerInfo from './timerInfo';

const Timer = React.createClass({

	render: () => {
		return (
			<div className="timer">
				<Clock />
				<TimerInfo />
			</div>
		)
	}

});

export default Timer;
