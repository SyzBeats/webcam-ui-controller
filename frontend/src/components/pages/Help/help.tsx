import { Button } from '../../ui/buttons/Button';
import classes from './help.module.css';

const Help = () => {
	return (
		<div className={classes.help}>
			<h1>Welcome</h1>

			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi minima consequatur beatae in, itaque necessitatibus cupiditate
				possimus vero quia, facere corrupti dignissimos sed debitis, consectetur voluptate nobis quisquam at unde!
			</p>

			<Button onClick={() => null} text="Click" variant="secondary" />
			<h2>Settings</h2>

			<p></p>
		</div>
	);
};

export default Help;
