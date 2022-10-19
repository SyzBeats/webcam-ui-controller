import create from 'zustand';
import { CameraNames, IStore } from '../types';

const useAppStore = create<IStore>((set, get) => ({
	presets: {},
	manipulations: {
		flip: false,
		mirror: false,
	},
	parameters: {
		panSpeed: 50,
		zoomSpeed: 5,
		focusSpeed: 5,
		tiltSpeed: 10,
	},
	camera: {
		name: CameraNames.fomako,
		ip: '127.0.0.2',
		port: 80,
		username: '',
		password: '',
	},

	setParameters: (parameters: IStore['parameters']) => set(() => ({ parameters })),

	setCamera: (camera: IStore['camera']) => set(() => ({ camera })),

	setPresets: (presets: IStore['presets']) => set(() => ({ presets })),

	setManipulations: (manipulations: IStore['manipulations']) => set(() => ({ manipulations })),

	getSettings: () => {
		const { parameters, camera, presets, manipulations } = get();
		return { parameters, camera, presets, manipulations };
	},
}));

export default useAppStore;
