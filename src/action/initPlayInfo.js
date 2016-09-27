import React from 'react';

import { INITPLAYINFO } from './actionTypes';

const initPlayInfo = (initData) => {
	return {
		type: INITPLAYINFO,
		initData
	}
}

export default initPlayInfo;