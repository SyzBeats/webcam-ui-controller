import { CameraNames, IStore, TSettings } from '../../types';

const _getBaseUrl = (cameraName: string, ip: string, port: number) => {
	switch (cameraName) {
		case CameraNames.fomako: {
			return `http://${ip}:${port}/ajaxcom?szCmd=`;
		}
		case CameraNames.smtav: {
			return `http://${ip}:${port}/cgi-bin/ptzctrl.cgi?ptzcmd&`;
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
const send = async (settings: TSettings, payload: string) => {
	try {
		const { ip, port, name } = settings.camera;

		const baseUrl = _getBaseUrl(name, ip, port);

		if (!baseUrl) {
			return;
		}

		const reqUrl = `${baseUrl}${payload}`;

		console.log(reqUrl);

		const res = await (await fetch(reqUrl)).json();

		return res;
	} catch (e: unknown) {
		console.error(`[ERROR]: sending command: ${e}`);
	}
};

const service = {
	send,
};

export default service;
