import React, { useRef, useEffect } from 'react';

import api from '../../../api';
import useAppStore from '../../../store';
import { Command } from '../../../types';

import { Button } from '../../ui/buttons/Button';
import { Icons } from '../../ui/icons/Icons';

import classes from './controlRoom.module.css';

const ControlRoom = () => {
	// State
	const store = useAppStore();

	// stopCommand
	const stopCommand = useRef('');
	const lastMovement = useRef('');

	const getStopCommand = (command: Command): Command | null => {
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
	const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>, command: Command) => {
		e.preventDefault();
		e.stopPropagation();

		if (!command) {
			return;
		}

		const payload = api.commands.getPayload(command, store.getSettings());

		const stopCmd = getStopCommand(command);

		if (stopCmd) {
			stopCommand.current = stopCmd;
			lastMovement.current = command;
		}

		api.service.send(store.getSettings(), payload);
	};

	const handleMouseUp = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!stopCommand.current || !lastMovement.current) {
			return;
		}

		const payload = api.commands.getPayload(stopCommand.current as Command, store.getSettings(), lastMovement.current?.toLowerCase());

		api.service.send(store.getSettings(), payload);
	};

	useEffect(() => {
		// on mouseup stop the command
		window.addEventListener('mouseup', handleMouseUp);

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
					<Button text="Redner" mouseDownHandler={() => null} />
					<Button text="Leser" mouseDownHandler={() => null} />
					<Button text="Tisch" mouseDownHandler={() => null} />
					<Button text="Schwarzbild" mouseDownHandler={() => null} />
					<Button text="Preset 5" mouseDownHandler={() => null} />
					<Button text="Preset 6" mouseDownHandler={() => null} />
					<Button text="Preset 7" mouseDownHandler={() => null} />
					<Button text="Preset 8" mouseDownHandler={() => null} />
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
								<Button variant="primary" text={<Icons name="dot" />} circle mouseDownHandler={e => handleMouseDown(e, 'focusAdd')} />
							</span>
							<span className={`${classes.button_focus_2} ${classes.flex_centered}`}>
								<Button variant="primary" text={<Icons name="letterA" />} circle mouseDownHandler={e => handleMouseDown(e, 'up')} />
							</span>
							<span className={`${classes.button_focus_3} ${classes.flex_centered}`}>
								<Button variant="primary" text={<Icons name="circle" />} circle mouseDownHandler={e => handleMouseDown(e, 'focusDec')} />
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ControlRoom;
