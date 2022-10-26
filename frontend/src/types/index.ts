/**
 * a single preset value used by the camera
 */
interface IPreset {
	name: string;
	value: string;
}

export interface IApiConfig {
	cgiInterface: 'ptzctrl.cgi' | 'param.cgi';
}

/**
 * all cameras which are supported by the app
 */
export enum CameraNames {
	fomako = 'fomako',
	smtav = 'smtav',
	none = '',
}

/**
 * Selection of all possible settings that are derived from the
 * settings interface input
 */
export type TSettings = Pick<IStore, 'parameters' | 'camera' | 'presets' | 'manipulations'>;

/**
 * The store interface which is used by the zustand state management
 */
export interface IStore {
	presets: {
		[key: string]: IPreset;
	} | null;
	manipulations: {
		flip: boolean;
		mirror: boolean;
	};
	parameters: {
		panSpeed?: number;
		zoomSpeed?: number;
		focusSpeed?: number;
		tiltSpeed?: number;
	};
	camera: {
		name: CameraNames;
		ip: string;
		port: number;
		username: string;
		password: string;
	};
	setInitialValues: () => void;
	getSettings: () => TSettings;
	setParameters: (parameters: IStore['parameters']) => void;
	setCamera: (camera: IStore['camera']) => void;
	setPresets: (presets: IStore['presets']) => void;
	setManipulations: (manipulations: IStore['manipulations']) => void;
}

/**
 * all possible actions for the camera
 */
const Commands = {
	up: 'up',
	down: 'down',
	left: 'left',
	right: 'right',
	stopPos: 'stopPos',
	stopZoom: 'stopZoom',
	stopFocus: 'stopFocus',
	focusAdd: 'focusAdd',
	focusDec: 'focusDec',
	zoomAdd: 'zoomAdd',
	zoomDec: 'zoomDec',
	home: 'home',
	preset: 'preset',
	setPreset: 'setPreset',
	focusLock: 'focusLock',
	setFlip: 'setFlip',
	setMirror: 'setMirror',
};

/**
 * used for camera control and start / stop commands
 */
export type TMovement = 'up' | 'down' | 'left' | 'right';

/**
 * used for controller in camera service
 */
export type TCommand = keyof typeof Commands;
