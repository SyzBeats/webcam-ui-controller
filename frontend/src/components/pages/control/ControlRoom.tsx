import React, { useRef, useEffect } from 'react';

import api from '~/api';
import useAppStore from '~/store';
import { CameraNames, TCommand } from '~/types';

import { Button } from '~/components/ui/buttons/Button';
import { Icons } from '~/components/ui/icons/Icons';

import classes from './controlRoom.module.css';

const ControlRoom = () => {
	// State
	const store = useAppStore();
	const settings = store.getSettings();

	// Refs
	const stopCommand = useRef('');
	const lastMovement = useRef('');
	const pending = useRef(false);

	/**
	 * movements need to be stopped after mouse release. This function is executed on mouse release
	 * and gets the right stop command
	 * @param command the command to base the stop command on
	 * @returns the stop command
	 */
	const getStopCommand = (command: TCommand): TCommand | null => {
		switch (command) {
			case 'up':
			case 'down':
			case 'left':
			case 'right': {
				return 'stopPos';
			}

			case 'focusAdd':
			case 'focusDec': {
				return 'stopFocus';
			}

			case 'zoomAdd':
			case 'zoomDec': {
				return 'stopZoom';
			}

			default: {
				return null;
			}
		}
	};

	/**
	 * mouse down handler for control buttons
	 * @param e event
	 * @param command the command to derive the payload from
	 */
	const handleMouseDown = async (e: React.MouseEvent<HTMLButtonElement>, command: TCommand) => {
		e.preventDefault();
		e.stopPropagation();

		if (!command || pending.current) {
			return;
		}

		let payLoad;

		// fomako edge case for focus stop and focus add
		// we need to send the stop command first and then the focus add / dec command
		if (settings.camera.name === CameraNames.fomako && ['focusAdd', 'focusDec'].includes(command)) {
			payLoad = api.commands.getCommandPayload('focusLock', settings, '3');
			await api.service.send(settings, payLoad);
		}

		payLoad = api.commands.getCommandPayload(command, settings);

		// command reset
		stopCommand.current = '';
		lastMovement.current = '';

		const stopCmd = getStopCommand(command);

		if (stopCmd) {
			stopCommand.current = stopCmd;
			lastMovement.current = command;
		}

		await api.service.send(settings, payLoad);
	};

	/**
	 * handles the click on preset buttons
	 * @param e event
	 * @param key the key of the preset
	 */
	const handlePresetClick = async (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
		e.preventDefault();
		e.stopPropagation();

		// command reset
		stopCommand.current = '';
		lastMovement.current = '';

		const payload = api.commands.getCommandPayload('preset', settings, key);

		await api.service.send(settings, payload);
	};

	/**
	 * handles mouse up for control buttons
	 * @param e mouse event
	 */
	const handleMouseUp = async (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!stopCommand.current || pending.current) {
			return;
		}

		const payload = api.commands.getCommandPayload(stopCommand.current as TCommand, settings, lastMovement.current?.toLowerCase());

		// lock
		pending.current = true;

		await api.service.send(settings, payload);

		// reset
		stopCommand.current = '';
		pending.current = false;
	};

	const handleFocusLock = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		stopCommand.current = '';
		lastMovement.current = '';

		let payload = api.commands.getCommandPayload('focusLock', settings, '2');

		await api.service.send(settings, payload);

		if (settings.camera.name === CameraNames.fomako) {
			payload = api.commands.getCommandPayload('focusLockZone', settings, '1');
			await api.service.send(settings, payload);
		}
	};

	useEffect(() => {
		// on mouseup stop the command
		window.addEventListener('mouseup', handleMouseUp);

		// cleanup
		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	return (
		<div className={classes.controlRoom}>
			<h1>Control Room</h1>

			<section className={`${classes.section} ${classes.presets}`}>
				<h2>Presets</h2>

				<div className={classes.presets_grid}>
					{Object.keys(settings.presets ?? {}).map(key => (
						<Button
							key={key}
							variant="primary"
							text={(settings.presets ?? {})[key].name}
							mouseDownHandler={e => handlePresetClick(e, key)}
						/>
					))}
				</div>
			</section>

			<section className={`${classes.section} ${classes.manual}`}>
				<h2>Manual Settings</h2>

				<div className={classes.manual_grid}>
					<div className={`${classes.manual_movement} ${classes.block}`}>
						<h3 className={classes.block_title}>Move</h3>
						<div className={classes.manual_movement_grid}>
							<span className={`${classes.button_up} ${classes.flex_centered}`}>
								<Button variant="primary" circle text={<Icons name="arrowUp" />} mouseDownHandler={e => handleMouseDown(e, 'up')} />
							</span>
							<span className={`${classes.button_left} ${classes.flex_centered}`}>
								<Button variant="primary" circle text={<Icons name="arrowLeft" />} mouseDownHandler={e => handleMouseDown(e, 'left')} />
							</span>

							<span className={`${classes.button_right} ${classes.flex_centered}`}>
								<Button variant="primary" circle text={<Icons name="arrowRight" />} mouseDownHandler={e => handleMouseDown(e, 'right')} />
							</span>

							<span className={`${classes.button_down} ${classes.flex_centered}`}>
								<Button variant="primary" circle text={<Icons name="arrowDown" />} mouseDownHandler={e => handleMouseDown(e, 'down')} />
							</span>

							<span className={`${classes.button_center} ${classes.flex_centered}`}>
								<Button variant="primary" text={<Icons name="home" />} circle mouseDownHandler={e => handleMouseDown(e, 'home')} />
							</span>
						</div>
					</div>
					<div className={`${classes.manual_zoom} ${classes.block}`}>
						<h3 className={classes.block_title}>Zoom</h3>
						<div className={classes.manual_zoom_grid}>
							<span className={`${classes.button_zoom_in} ${classes.flex_centered}`}>
								<Button variant="primary" text={<Icons name="plus" />} circle mouseDownHandler={e => handleMouseDown(e, 'zoomAdd')} />
							</span>
							<span className={`${classes.button_zoom_out} ${classes.flex_centered}`}>
								<Button variant="primary" text={<Icons name="minus" />} circle mouseDownHandler={e => handleMouseDown(e, 'zoomDec')} />
							</span>
						</div>
					</div>
					<div className={`${classes.manual_focus} ${classes.block}`}>
						<h3 className={classes.block_title}>Focus</h3>
						<div className={classes.manual_focus_grid}>
							<span className={`${classes.button_focus_1} ${classes.flex_centered}`}>
								<Button
									disabled={settings.camera.name === CameraNames.fomako}
									variant="primary"
									text={<Icons name="dot" />}
									circle
									mouseDownHandler={e => handleMouseDown(e, 'focusAdd')}
								/>
							</span>
							<span className={`${classes.button_focus_2} ${classes.flex_centered}`}>
								<Button variant="primary" text={<Icons name="letterA" />} circle mouseDownHandler={e => handleFocusLock(e)} />
							</span>
							<span className={`${classes.button_focus_3} ${classes.flex_centered}`}>
								<Button
									disabled={settings.camera.name === CameraNames.fomako}
									variant="primary"
									text={<Icons name="circle" />}
									circle
									mouseDownHandler={e => handleMouseDown(e, 'focusDec')}
								/>
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ControlRoom;
