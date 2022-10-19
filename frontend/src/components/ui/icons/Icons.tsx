import React from 'react';

import classes from './icons.module.css';

const getSVGElement = (name: string) => {
	switch (name) {
		case 'arrowUp': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
				</svg>
			);
		}
		case 'arrowRight': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
				</svg>
			);
		}
		case 'arrowLeft': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
				</svg>
			);
		}
		case 'arrowDown': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
				</svg>
			);
		}
		case 'home': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 1024 1024"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
				</svg>
			);
		}
		case 'plus': {
			return (
				<svg
					stroke="currentColor"
					fill="none"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
				</svg>
			);
		}
		case 'minus': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd"></path>
				</svg>
			);
		}
		case 'dot': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 8 16"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fillRule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"></path>
				</svg>
			);
		}
		case 'circle': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 16 16"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
				</svg>
			);
		}
		case 'letterA': {
			return (
				<svg
					stroke="currentColor"
					fill="none"
					strokeWidth="2"
					viewBox="0 0 24 24"
					strokeLinecap="round"
					strokeLinejoin="round"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<desc></desc>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M7 20v-12a4 4 0 0 1 4 -4h2a4 4 0 0 1 4 4v12"></path>
					<line x1="7" y1="13" x2="17" y2="13"></line>
				</svg>
			);
		}

		case 'webcam': {
			return (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g>
						<path fill="none" d="M0 0h24v24H0z"></path>
						<path d="M11 21v-1.07A7.002 7.002 0 0 1 5 13V8a7 7 0 1 1 14 0v5a7.002 7.002 0 0 1-6 6.93V21h4v2H7v-2h4zm1-12a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
					</g>
				</svg>
			);
		}
		default: {
			return <></>;
		}
	}
};

interface IProps {
	name: 'arrowUp' | 'arrowRight' | 'arrowLeft' | 'arrowDown' | 'home' | 'plus' | 'minus' | 'dot' | 'circle' | 'letterA' | 'webcam';
}

const Icons = (props: IProps): JSX.Element => {
	return getSVGElement(props.name);
};

export { Icons };
