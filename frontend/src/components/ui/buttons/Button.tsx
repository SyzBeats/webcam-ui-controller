import React from 'react';

import styles from './button.module.css';

interface IProps {
	text: string | React.ReactNode;
	variant?: 'primary' | 'secondary';
	circle?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
	mouseDownHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	mouseUpHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}
const Button = (props: IProps) => {
	const classes = [styles.button];

	if (props.variant === 'primary') {
		classes.push(styles.primary);
	}

	if (props.variant === 'secondary') {
		classes.push(styles.secondary);
	}

	if (props.circle) {
		classes.push(styles.circled);
	}

	if (props.disabled) {
		classes.push(styles.disabled);
	}

	return (
		<button
			disabled={props.disabled}
			className={classes.join(' ')}
			onClick={props.onClick}
			onMouseDown={props.mouseDownHandler}
			onMouseUp={props.mouseUpHandler}
		>
			{props.text}
		</button>
	);
};

export { Button };
