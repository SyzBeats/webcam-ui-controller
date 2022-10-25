import { TCommand, TMovement, TSettings } from '../../types';

/**
 * contains the commands for the currently configured models (fomako, smtav)
 * the commands are functions that return the payload based on the current settings
 *
 * when the setting parameters are set to flip or mirror the payload is adjusted accordingly
 * to enable the expected control behaviour
 */
const commandPayloads = {
	fomako: {
		/**
		 * exectuted when the up button is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		up: (settings: TSettings, _: any) => {
			const szPtzCmd = settings.manipulations.flip ? 'down_start' : 'up_start';

			return { SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd, byValue: settings.parameters.panSpeed } } };
		},

		/**
		 * exectuted when the down button is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		down: (settings: TSettings, _: any) => {
			const szPtzCmd = settings.manipulations.flip ? 'up_start' : 'down_start';

			return { SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd, byValue: settings.parameters.panSpeed } } };
		},

		/**
		 * exectuted when the up left is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		left: (settings: TSettings, _: any) => {
			const szPtzCmd = settings.manipulations.mirror ? 'right_start' : 'left_start';

			return { SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd, byValue: settings.parameters.panSpeed } } };
		},

		/**
		 * exectuted when the right button is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		right: (settings: TSettings, _: any) => {
			const szPtzCmd = settings.manipulations.mirror ? 'left_start' : 'right_start';

			return { SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd, byValue: settings.parameters.panSpeed } } };
		},

		/**
		 * position stop command - used for left, right, up, down and is executed when the button is released
		 * @param _ unused
		 * @param movement the movement that is stopped
		 * @returns the payload for the command
		 */
		stopPos: (_s: TSettings, movement: TMovement) => ({ SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: `${movement}_stop`, byValue: 0 } } }),

		/**
		 * zoom add command - used for zoom in
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		zoomAdd: (_s: TSettings, _: any) => ({ SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: 'zoomadd_start', byValue: 0 } } }),

		/**
		 * zoom decrease command - used for zoom out
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		zoomDec: (_s: TSettings, _: any) => ({ SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: 'zoomdec_start', byValue: 0 } } }),

		/**
		 * zoom stop command - used for zoom cancelation
		 * @param settings the current settings
		 * @param movement the movement that is stopped
		 * @returns the payload for the command
		 */
		stopZoom: (_s: TSettings, movement: 'zoomadd' | 'zoomdec') => ({
			SysCtrl: {
				PtzCtrl: {
					nChanel: 0,
					szPtzCmd: `${movement}_stop`,
					byValue: 0,
				},
			},
		}),

		/**
		 * focus add command - used to adjust focus additively
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		focusAdd: (_s: TSettings, _: any) => ({ SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: 'focusadd_start', byValue: 0 } } }),

		/**
		 * focus decrease command - used to adjust focus negatively
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		focusDec: (_s: TSettings, _: any) => ({ SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: 'focusdec_start', byValue: 0 } } }),

		/**
		 * focus stop command - used to adjust focus additively
		 * @param _ unused
		 * @param movement the movement that is stopped
		 * @returns the payload for the command
		 */
		stopFocus: (_s: TSettings, movement: 'focusadd' | 'focusdec') => ({
			SysCtrl: {
				PtzCtrl: {
					nChanel: 0,
					szPtzCmd: `${movement}_stop`,
					byValue: 0,
				},
			},
		}),

		/**
		 * home command - sets the camera to the home position
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		home: (settings: TSettings, _: any) => ({
			SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: 'go_home', byValue: settings.parameters.panSpeed } },
		}),

		/**
		 * preset selection command - used for preset selection
		 * @param settings the current settings
		 * @param movement the preset number to move to
		 * @returns the payload for the command
		 */
		preset: (_s: TSettings, movement: string) => ({ SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: 'preset_call', byValue: movement } } }),

		/**
		 * preset set command - used for preset setting
		 * @param _s unused
		 * @param value the value to set the camera to
		 * @returns
		 */
		setPreset: (_s: TSettings, value: string) => ({ SysCtrl: { PtzCtrl: { nChanel: 0, szPtzCmd: 'preset_set', byValue: value } } }),

		/**
		 * movees to the right preset
		 * @param _s unused
		 * @param movement  the preset number to move to
		 * @returns
		 */
		focusLock: (_s: TSettings, movement: any) => ({ SetEnv: { VideoParam: [{ stAF: { emAFMode: movement }, nChannel: 0 }] } }),
	},
	smtav: {
		/**
		 * exectuted when the up button is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		up: (settings: TSettings, _: any) => {
			const direction = settings.manipulations.flip ? 'down' : 'up';

			return `${direction}&${settings.parameters.panSpeed}&${settings.parameters.tiltSpeed}`;
		},

		/**
		 * exectuted when the down button is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		down: (settings: TSettings, _: any) => {
			const direction = settings.manipulations.flip ? 'up' : 'down';

			return `${direction}&${settings.parameters.panSpeed}&${settings.parameters.tiltSpeed}`;
		},

		/**
		 * exectuted when the up left is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		left: (settings: TSettings, _: any) => {
			const direction = settings.manipulations.mirror ? 'right' : 'left';

			return `${direction}&${settings.parameters.panSpeed}&${settings.parameters.tiltSpeed}`;
		},

		/**
		 * exectuted when the right button is pressed
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		right: (settings: TSettings, _: any) => {
			const direction = settings.manipulations.mirror ? 'left' : 'right';

			return `${direction}&${settings.parameters.panSpeed}&${settings.parameters.tiltSpeed}`;
		},

		/**
		 * position stop command - used for left, right, up, down and is executed when the button is released
		 * @param _ unused
		 * @param movement the movement that is stopped
		 * @returns the payload for the command
		 */
		stopPos: (_settings: TSettings, _: any) => 'ptzstop',

		/**
		 * focus add command - used to adjust focus additively
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		focusAdd: (settings: TSettings, _: any) => `focusin&${settings.parameters.focusSpeed}`,

		/**
		 * focus decrease command - used to adjust focus negatively
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		focusDec: (settings: TSettings, _: any) => `focusout&${settings.parameters.focusSpeed}`,

		/**
		 * focus stop command - used to adjust focus additively
		 * @param _settings unused
		 * @param _ unused
		 * @returns the payload for the command
		 */
		stopFocus: (_settings: TSettings, _: any) => 'focusstop',

		/**
		 * zoom add command - used for zoom in
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		zoomAdd: (settings: TSettings, _: any) => `zoomin&${settings.parameters.zoomSpeed}`,

		/**
		 * zoom decrease command - used for zoom out
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		zoomDec: (settings: TSettings, _: any) => `zoomout&${settings.parameters.zoomSpeed}`,

		/**
		 * zoom stop command - used for zoom cancelation
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		stopZoom: (_settings: TSettings, _: any) => 'zoomstop',

		/**
		 * home command - sets the camera to the home position
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		home: (_settings: TSettings, _: any) => 'home',

		/**
		 * home command - sets the camera to the home position
		 * @param settings the current settings
		 * @param value the preset number to move to
		 * @returns the payload for the command
		 */
		preset: (_settings: TSettings, value: string) => `poscall&${value}`,

		/**
		 * preset set command - used for preset setting
		 * @param _ unused
		 * @param value the value to set the camera to
		 * @returns the payload for the command
		 */
		setPreset: (_: TSettings, value: string) => `posset&${value}`,

		/**
		 * home command - sets the camera to the home position
		 * @param settings the current settings
		 * @param _ unused
		 * @returns the payload for the command
		 */
		focusLock: (_settings: TSettings, _: string) => 'lock_mfocus',
	},
};

/**
 * commandController
 * @param command the command to be executed
 * @param settings the settings to be used for the command
 * @returns the payload for the command as stringified version
 */
const getCommandPayload = (command: TCommand, settings: TSettings, movement: string = '') => {
	if (!settings.camera.name) {
		console.error('No camera selected');
		return '';
	}

	// exeucte commands function which populates the payload
	const payLoad = commandPayloads[settings.camera.name][command](settings, movement);

	// fomako payload is returned as object, stringify it
	if (typeof payLoad !== 'string') {
		return JSON.stringify(payLoad);
	}

	return payLoad;
};

/**
 * commandcontroller export functions
 */
const commands = {
	getCommandPayload,
};

export default commands;
