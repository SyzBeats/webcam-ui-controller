import create from 'zustand';
import { CameraNames, IStore } from '../types';

import { GetSettings } from '~/../wailsjs/go/main/App';

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

	/**
	 * used in app setup to load the settings from the filesystem
	 * and put them in place.
	 */
	setInitialValues: async () => {
		const settings = await GetSettings();
		console.log(settings);
	},

	/**
	 * sets the different settings to the values in the incoming parameter.
	 * @param parameters the new parameters
	 */
	setParameters: (parameters: IStore['parameters']) => set(() => ({ parameters })),

	/**
	 * stores the cam name to eval other parameters depending on it
	 * @param camera the camera to take for the current settings.
	 */
	setCamera: (camera: IStore['camera']) => set(() => ({ camera })),

	/**
	 * sets the presets from the camera interface
	 * @param presets stores the current presets for movement.
	 */
	setPresets: (presets: IStore['presets']) => set(() => ({ presets })),

	/**
	 * sets new manipulation values from the camera interface.
	 * @param manipulations the image manipulation to use.
	 */
	setManipulations: (manipulations: IStore['manipulations']) => set(() => ({ manipulations })),

	/**
	 * @returns the current camera settings.
	 */
	getSettings: () => {
		const { parameters, camera, presets, manipulations } = get();
		return { parameters, camera, presets, manipulations };
	},
}));

export default useAppStore;
