import { CameraNames, IApiConfig, TSettings } from '../../types';

const _getBaseUrl = (cameraName: string, ip: string, port: number, config: IApiConfig) => {
	switch (cameraName) {
		case CameraNames.fomako: {
			return `http://${ip}:${port}/ajaxcom?szCmd=`;
		}
		case CameraNames.smtav: {
			if (config.cgiInterface === 'ptzctrl.cgi') {
				return `http://${ip}:${port}/cgi-bin/ptzctrl.cgi?ptzcmd&`;
			}

			return `http://${ip}:${port}/cgi-bin/param.cgi?post_image_value&`;
		}
		default: {
			return '';
		}
	}
};

/**
 * Send the command to the camera
 * @param settings The current app settings
 * @param payload the payload to be sent to the camera
 * @returns the response from the camera
 */
const send = async (settings: TSettings, payload: string, config: IApiConfig = { cgiInterface: 'ptzctrl.cgi' }) => {
	try {
		const { ip, port, name } = settings.camera;

		const baseUrl = _getBaseUrl(name, ip, port, config);

		if (!baseUrl) {
			return;
		}

		const reqUrl = `${baseUrl}${payload}`;

		const res = await (await fetch(reqUrl)).json();

		return res;
	} catch (e: unknown) {
		console.error(`[ERROR]: sending command: ${e}`);
		return null;
	}
};

const service = {
	send,
};

export default service;
