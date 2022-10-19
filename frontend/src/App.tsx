import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Settings from './components/pages/settings/Settings';
import ControlRoom from './components/pages/control/ControlRoom';
import Help from './components/pages/Help/help';
import Container from './components/layout/Container';

function App() {
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
