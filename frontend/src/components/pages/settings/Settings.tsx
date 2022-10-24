import React from 'react';
import useAppStore from '~/store';
import { CameraNames } from '~/types';
import { Button } from '~/components/ui/buttons/Button';

// wails golang interface

import styles from './settings.module.css';

const Settings = () => {
	const store = useAppStore();

	const settings = store.getSettings();

	/**
	 * Camera change handler which updates the current camera name in the store
	 * @param e event
	 */
	const handleCameraNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const camera = e.target.value as CameraNames;

		store.setCamera({
			...settings.camera,
			name: camera,
		});
	};

	const handleCameraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		store.setCamera({
			...settings.camera,
			[name]: value,
		});
	};

	/**
	 * changes the manipulation mode for mirror and flip
	 * @param e event
	 */
	const handleImageManipulationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;

		store.setManipulations({
			...settings.manipulations,
			[name]: !settings.manipulations[name as 'mirror' | 'flip'],
		});
	};

	const handleParameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		store.setParameters({
			...settings.parameters,
			[name]: value,
		});
	};

	const handlePresetChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
		const { value } = e.target;

		const newPresets = {
			...settings.presets,
			[key]: {
				...(settings.presets ?? {})[key],
				name: value,
			},
		};

		store.setPresets(newPresets);
	};

	return (
		<div className={styles.settings}>
			<h1>Settings</h1>

			<section className={styles.cameraType}>
				<h2>camera type</h2>

				<div className={styles.box}>
					<label>
						<input
							checked={settings.camera.name === CameraNames.smtav}
							type="radio"
							name="cameraType"
							value={CameraNames.smtav}
							onChange={handleCameraNameChange}
						/>
						SMTAV
					</label>
					<label>
						<input
							checked={settings.camera.name === CameraNames.fomako}
							type="radio"
							name="cameraType"
							value={CameraNames.fomako}
							onChange={handleCameraNameChange}
						/>
						FoMaKo
					</label>
				</div>
			</section>

			<section className={styles.presets}>
				<h2>Presets</h2>

				<div className={styles.box}>
					{Object.keys(settings.presets ?? {}).map(key => (
						<div key={key} className={styles.align}>
							<div className={styles.presets_num}>{key}</div>
							<label>
								<input type="text" name={key} value={(settings.presets ?? {})[key].name} onChange={e => handlePresetChange(e, key)} />
							</label>
						</div>
					))}

					<div className={styles.presets_description}>
						<h3>Assign presets</h3>

						<ol className={styles.padded}>
							<li>Move the camera into the position you want </li>
							<li>Click the set button you want assign </li>
							<li>Enter a Name for the preset button</li>
						</ol>
					</div>
				</div>
			</section>

			<section className={styles.imageMods}>
				<h2>Image Manipulation</h2>

				<div className={`${styles.align} ${styles.column} ${styles.padded}`}>
					<label>
						<input type="checkbox" name="flip" checked={settings.manipulations.flip} onChange={handleImageManipulationChange} />
						flip
					</label>
					<label>
						<input type="checkbox" name="mirror" checked={settings.manipulations.mirror} onChange={handleImageManipulationChange} />
						Mirror
					</label>
				</div>
			</section>

			<section className={styles.parameters}>
				<h2>Parameters</h2>

				<div className={styles.padded}>
					<div className={`${styles.align} ${styles.equalWidths}`}>
						<label>
							Camera IP <br />
							<input type="text" name="ip" value={settings.camera.ip} onChange={handleCameraChange} />
						</label>
						<label>
							Camera Port <br />
							<input type="number" name="port" value={settings.camera.port} onChange={handleCameraChange} />
						</label>
					</div>
					<div className={`${styles.align} ${styles.equalWidths}`}>
						<label>
							PAN Speed <br />
							<input type="number" name="panSpeed" value={settings.parameters.panSpeed} onChange={handleParameterChange} />
						</label>
						<label>
							TILT Speed <br />
							<input type="number" name="tiltSpeed" value={settings.parameters.tiltSpeed} onChange={handleParameterChange} />
						</label>
					</div>
					<div className={`${styles.align} ${styles.equalWidths}`}>
						<label>
							Focus Speed <br />
							<input type="number" name="focusSpeed" value={settings.parameters.focusSpeed} onChange={handleParameterChange} />
						</label>
						<label>
							Zoom Speed <br />
							<input type="number" name="zoomSpeed" value={settings.parameters.zoomSpeed} onChange={handleParameterChange} />
						</label>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Settings;
