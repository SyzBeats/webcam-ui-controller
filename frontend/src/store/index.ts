import create from 'zustand';
import { CameraNames, IStore } from '../types';

import { GetSettings, StoreSettings } from '~/../wailsjs/go/main/App';
import { json } from 'stream/consumers';

const defaultSettings = {
	presets: {
		1: {
			name: 'Preset 1',
			value: '1',
		},
		2: {
			name: 'Preset 2',
			value: '2',
		},
		3: {
			name: 'Preset 3',
			value: '3',
		},
		4: {
			name: 'Preset 4',
			value: '4',
		},
		5: {
			name: 'Preset 5',
			value: '5',
		},
		6: {
			name: 'Preset 6',
			value: '6',
		},
		7: {
			name: 'Preset 7',
			value: '7',
		},
		8: {
			name: 'Preset 8',
			value: '8',
		},
	},
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
};

const useAppStore = create<IStore>((set, get) => ({
	presets: null,
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

		if (!settings) {
			set(defaultSettings);
			return;
		}

		const jsonString = JSON.parse(settings) as IStore;

		set(jsonString);
	},

	/**
	 * sets the different settings to the values in the incoming parameter.
	 * @param parameters the new parameters
	 */
	setParameters: (parameters: IStore['parameters']) => {
		set(() => ({ parameters }));
		StoreSettings(JSON.stringify(get().getSettings()));
	},

	/**
	 * stores the cam name to eval other parameters depending on it
	 * @param camera the camera to take for the current settings.
	 */
	setCamera: (camera: IStore['camera']) => {
		set(() => ({ camera }));
		StoreSettings(JSON.stringify(get().getSettings()));
	},

	/**
	 * sets the presets from the camera interface
	 * @param presets stores the current presets for movement.
	 */
	setPresets: (presets: IStore['presets']) => {
		set(() => ({ presets }));

		StoreSettings(JSON.stringify(get().getSettings()));
	},

	/**
	 * sets new manipulation values from the camera interface.
	 * @param manipulations the image manipulation to use.
	 */
	setManipulations: (manipulations: IStore['manipulations']) => {
		set(() => ({ manipulations }));
		StoreSettings(JSON.stringify(get().getSettings()));
	},

	/**
	 * @returns the current camera settings.
	 */
	getSettings: () => {
		const { parameters, camera, presets, manipulations } = get();
		return { parameters, camera, presets, manipulations };
	},
}));

export default useAppStore;
