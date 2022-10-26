import React from 'react';

/**
 * a toast hook that shows a toast message for a given duration
 */

const useToast = () => {
	const [toast, setToast] = React.useState({
		message: '',
		duration: 0,
	});

	const show = (message: string, duration: number) => {
		setToast({
			message,
			duration,
		});
	};

	// hide the toast after the given duration
	React.useEffect(() => {
		if (toast.duration > 0) {
			const timeout = setTimeout(() => {
				setToast({
					message: '',
					duration: 0,
				});
			}, toast.duration);

			return () => clearTimeout(timeout);
		}
	}, [toast.duration]);

	return {
		toast,
		show,
	};
};

export default useToast;
