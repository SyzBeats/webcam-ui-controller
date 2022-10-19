import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

import classes from './container.module.css';
interface Props {
	children: React.ReactNode;
}
const Container = ({ children }: Props) => {
	return (
		<div className={classes.container}>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Container;
