import { Icons } from '~/components/ui/icons/Icons';
import { Menu } from '~/components/ui/menu/Menu';

import classes from './header.module.css';

const Header = () => {
	return (
		<header className={classes.header}>
			<div className={classes.left}>
				<span className={classes.icon}>
					<Icons name="webcam" />
				</span>
			</div>
			<div className={classes.right}>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
