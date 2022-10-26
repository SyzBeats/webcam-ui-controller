import React from 'react';

import styles from './Toast.module.css';

interface IToastProps {
	message: string;
}

const Toast = ({ message }: IToastProps) => {
	const classes = [styles.toast];

	return (
		<div className={classes.join(' ')}>
			<p>{message}</p>
		</div>
	);
};

export default Toast;
