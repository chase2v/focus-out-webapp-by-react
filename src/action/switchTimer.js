import React from 'react';
import { SWITCHTIMER } from './actionTypes';

const switchTimer = (nextTimer) => {
	return {
		type: SWITCHTIMER,
		nextTimer
	}
}

export default switchTimer;