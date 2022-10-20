import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Settings from './components/pages/settings/Settings';
import ControlRoom from './components/pages/control/ControlRoom';
import Help from './components/pages/Help/help';
import Container from './components/layout/Container';

import './App.css';
import useAppStore from './store';

function App() {
	const initSettings = useAppStore(store => store.setInitialValues);

	// initialisation of the whole UI settings
	useEffect(() => {
		initSettings?.();
	}, [initSettings]);

	return (
		<Router>
			<Container>
				<Routes>
					<Route path="/" element={<ControlRoom />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/help" element={<Help />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
