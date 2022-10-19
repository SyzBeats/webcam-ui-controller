import React from 'react';
import styles from './menu.module.css';
import { Link } from 'react-router-dom';
const Menu = () => {
	return (
		<nav className={styles.navigation}>
			<ul>
				<li>
					<Link to="/">Control Room</Link>
				</li>
				<li>
					<Link to="/settings">Settings</Link>
				</li>
				<li>
					<Link to="/help">Help</Link>
				</li>
			</ul>
		</nav>
	);
};

export { Menu };
