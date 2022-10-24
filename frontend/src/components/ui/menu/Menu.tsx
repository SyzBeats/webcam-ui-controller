import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserOpenURL } from '~/../wailsjs/runtime';

import styles from './menu.module.css';

const Menu = () => {
	const openURL = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
		e.preventDefault();
		BrowserOpenURL(url);
	};

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
					<a onClick={e => openURL(e, 'https://cameracontrol.atlassian.net/wiki/spaces/CS/overview')}>Help</a>
				</li>
			</ul>
		</nav>
	);
};

export { Menu };
