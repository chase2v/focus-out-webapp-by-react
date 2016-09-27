import React from 'react';

import { INITUSERINFO } from './actionTypes';

const initUserInfo = (initData) => {
	return {
		type: INITUSERINFO,
		initData
	}
}

export default initUserInfo;